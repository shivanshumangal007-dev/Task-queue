import { createClient } from "redis";
import { addTaskToQueue } from "../api/redisclient.js";

const client = createClient();
const PROCESSING_DELAY_MS = Number(process.env.PROCESSING_DELAY_MS || 16000);
const FAILURE_RATE = Number(process.env.FAILURE_RATE || 0.3);

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

const processTask = async (task) => {
	task.status = "processing";
	await client.set("current_processing_task", JSON.stringify(task));
	console.log(
		`Processing task: ${task.task_type} with payload:`,
		task.payload,
	);
	await new Promise((resolve, reject) => {
		const shouldFail = Math.random() < FAILURE_RATE;
		if (shouldFail) {
			client.del("current_processing_task");
			task.status = "failed";
			addTaskToQueue(task, "failed_tasks");
			reject(new Error("Simulated task failure"));
			return;
		}
		setTimeout(resolve, PROCESSING_DELAY_MS);
	});

	await client.del("current_processing_task");

	task.status = "completed";
	await addTaskToQueue(task, "completed_tasks");

	console.log(`Task completed: ${task.task_type}`);
};
while (true) {
	const task = await client.brPop("task_queue", 10);
	if (task) {
		const t = JSON.parse(task.element);
		console.log(`Received task: ${t.task_type} with payload:`, t.payload);
		try {
			await processTask(t);
		} catch (error) {
			console.log(`Error processing task ${t.task_id}:`, error.message);
		}
	} else {
		console.log("No tasks in queue, waiting...");
	}
}

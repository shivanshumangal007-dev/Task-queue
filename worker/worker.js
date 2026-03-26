import { createClient } from "redis";
import { addTaskToQueue } from "../api/redisclient.js";


const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();


const processTask = async (task) => {
	task.status = "processing";
    client.set("current_processing_task", JSON.stringify(task));
	console.log(
		`Processing task: ${task.task_type} with payload:`,
		task.payload,
	);
	await new Promise((resolve) => setTimeout(resolve, 16000));
    
    client.del("current_processing_task");

	task.status = "completed";
	await addTaskToQueue(task, "completed_tasks");

	console.log(`Task completed: ${task.task_type}`);
};
while (true) {
	const task = await client.brPop("task_queue", 10);
	if (task) {
		const t = JSON.parse(task.element);
		console.log(`Received task: ${t.task_type} with payload:`, t.payload);
		await processTask(t);
	} else {
		console.log("No tasks in queue, waiting...");
	}
}

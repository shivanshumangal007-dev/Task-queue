const processTask = async (task) => {
    task.status = "processing";
	console.log(
		`Processing task: ${task.task_type} with payload:`,
		task.payload,
	);

	await new Promise((resolve) => setTimeout(resolve, 16000));

	task.status = "completed";

	console.log(`Task completed: ${task.task_type}`);
};

export { processTask };

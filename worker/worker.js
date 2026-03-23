import { processTask } from "./taskProcesses.js";
import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));


await client.connect();

while(true){
    const task = await client.brPop("task_queue", 10);
    if(task){
        const t = JSON.parse(task.element);
        console.log(`Received task: ${t.task_name} with payload:`, t.payload);
        await processTask(t);
    }
    else{
        console.log("No tasks in queue, waiting...");
    }
}
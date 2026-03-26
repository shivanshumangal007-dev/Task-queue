import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));


await client.connect();

const addTaskToQueue = async (task , queueName) => {
    try{
        if(queueName === "task_queue"){
            task.status = "queued";
        }
        await client.lPush(queueName, JSON.stringify(task));
    } catch (error) {
        console.error("Error adding task to queue:", error);
    }
}
const getTaskInfo = async (task_id) => {
    try{
        let tasks = await client.lRange("task_queue", 0, -1);
        for(let task of tasks){
            const t = JSON.parse(task);
            if(t.task_id === task_id){
                return t;
            }
        } 
        tasks = await client.lRange("completed_tasks", 0, -1);
        for(let task of tasks){
            const t = JSON.parse(task);
            if(t.task_id === task_id){
                return t;
            }
        } 
        return null;
    }catch (error) {
        console.error("Error fetching task info:", error);
        return null;
    }
}

const getNumberOfTasksInQueue = async () => {
    try{
        const queuedTask = await client.lLen("task_queue");
        const completedTask = await client.lLen("completed_tasks");
        const totalTask = queuedTask + completedTask;
        return { queuedTask, completedTask , totalTask};
    }catch (error) {
        console.error("Error fetching number of tasks in queue:", error);
        return null;
    }
}

const getAlltasks = async () => {
    try{
        const queuedTasks = await client.lRange("task_queue", 0, -1);
        const parsedQueuedTasks = queuedTasks.map((task) => JSON.parse(task));
        return { tasks: parsedQueuedTasks };
    }catch(error){
        console.error("Error fetching all tasks:", error);
        return null;
    }
}

export { addTaskToQueue, getTaskInfo, getNumberOfTasksInQueue, getAlltasks };
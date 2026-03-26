import React, { useState } from "react";
import Nav from "./components/Nav";
import MainContent from "./components/MainContent";
import InjectNewBox from "./components/InjectNewBox";
import MainContent2 from "./components/MainContent2";
import { apiClient } from "./utils/api";

const App = () => {
	const [totaltask, setTotaltask] = useState(0);
	const [queuedTask, setQueuedTask] = useState(0);
	const [completedTask, setCompletedTask] = useState(0);
	const [tasks, setTasks] = useState([]);

	apiClient.get("/NumberOfTasks").then((response) => {
		const { totalTask, queuedTask, completedTask } = response.data;
		setTotaltask(totalTask);
		setQueuedTask(queuedTask);
		setCompletedTask(completedTask);
	});

	apiClient.get("/getTasks").then((response) => {
		setTasks(response.data.tasks);
	});
	return (
		<div
			id='main'
			className='w-full h-screen bg-black/95 flex flex-col px-8 overflow-y-auto py-10'
		>
			<Nav />
			<MainContent
				totalTask={totaltask}
				queuedTask={queuedTask}
				completedTask={completedTask}
			/>
			<MainContent2
				setTotaltask={setTotaltask}
				setQueuedTask={setQueuedTask}
				setCompletedTask={setCompletedTask}
				setTasks={setTasks}
				tasks={tasks}
			/>
		</div>
	);
};

export default App;

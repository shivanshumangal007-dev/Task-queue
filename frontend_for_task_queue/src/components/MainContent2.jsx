import React from 'react'
import LiveExecutionFeed from './LiveExecutionFeed';
import InfoBox from './InfoBox';
import InjectNewBox from './InjectNewBox';

const MainContent2 = ({ setTotaltask, setQueuedTask, setCompletedTask, setTasks, tasks }) => {
  return (
		<div className='flex flex-wrap justify-between gap-5 my-5'>
			{/* <InfoBox /> */}
			<InjectNewBox setTotaltask={setTotaltask} setQueuedTask={setQueuedTask} setCompletedTask={setCompletedTask} setTasks={setTasks} />
			<LiveExecutionFeed tasks={tasks} />
		</div>
  );
}

export default MainContent2

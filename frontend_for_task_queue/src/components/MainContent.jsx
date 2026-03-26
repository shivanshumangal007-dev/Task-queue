import React from "react";
import Numeral_dataBox from "./Numeral_dataBox";
import InjectNewBox from "./InjectNewBox";
import InfoBox from "./InfoBox";

const MainContent = ({ totalTask, queuedTask, completedTask }) => {
	return (
		<div className='flex flex-wrap justify-between gap-5 mt-5'>
			{/* <InjectNewBox /> */}
            <InfoBox/>
			<div className='flex flex-col w-[49%] gap-1 justify-between'>
				{/* <Numeral_dataBox title='ACTIVE THREADS' current={128} total={256} /> */}
				<Numeral_dataBox title='QUEUED TASKS' current={queuedTask} total={totalTask} />
				<Numeral_dataBox title='COMPLETED TASKS' current={completedTask} total={totalTask} />
			</div>
		</div>
	);
};

export default MainContent;

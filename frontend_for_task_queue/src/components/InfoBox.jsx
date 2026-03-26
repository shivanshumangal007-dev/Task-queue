import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { apiClient } from "../utils/api";
const InfoBox = () => {

   
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = e.target.task_id.value;
        console.log("Fetching info for task id:", id);

        apiClient.get(`/task/${id}`)
            .then((response) => {
                console.log("Task info:", response.data);
                setTaskData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching task info:", error);
            });
    }
    const [taskData, setTaskData] = useState({
        "id": "#9219-GS",
        "payloadType": "DATA_TRANSFORM_V2",
        "status": "COMPLETED",
        "createdAt": "2024-09-01T12:34:56Z",
    })
	return (
		<div className=' w-[49%] bg-white/5 px-7 py-10 flex flex-col gap-5 text-white'>
			<div className='flex items-center gap-2'>
				<FontAwesomeIcon icon={faMagnifyingGlass} className='text-xl text-white/60' />
				<h1 className='text-3xl font-semibold'>Get Task Info</h1>
			</div>
			<h3 className="text-white/60 text-md font-semibold uppercase">Reference Identifier</h3>
			<form action='' className='flex flex-col gap-5' onSubmit={handleSubmit}>
				<input
					type='text'
                    name="task_id"
					className='bg-white/10 px-3 py-4'
					placeholder='For Eg: #9219-GS'
				/>
				<button
					type='submit'
					className='bg-white text-black py-3 font-bold text-xl cursor-pointer'
				>
					Search
				</button>
			</form>
            {taskData && (
                <div className='mt-5'>
                    <h3 className='text-lg font-semibold text-gray-400'>Task Information</h3>
                    <pre className='bg-black/50 p-4 text-green-400 font-mono text-sm'>
                        {JSON.stringify(taskData, null, 2)}
                    </pre>
                </div>
            )} 
		</div>
	);
};

export default InfoBox;

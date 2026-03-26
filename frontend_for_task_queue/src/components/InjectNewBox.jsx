import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { apiClient } from "../utils/api";

const InjectNewBox = ({ setTotaltask, setQueuedTask, setTasks }) => {
	const [payloadType, setPayloadType] = useState("Send_SMS");
	const [jsonConfig, setJsonConfig] = useState(
		`{
	"phone": "+1234567890",
	"message": "Your OTP is 1234"
}`,
	);

	const handleCommit = () => {
		setQueuedTask((prev) => prev + 1);
		setTotaltask((prev) => prev + 1);
		console.log("Committing to queue:", {
			payloadType,
			jsonConfig,
		});
		apiClient
			.post("/tasks", {
				task_type: payloadType,
				payload: JSON.parse(jsonConfig),
			})
			.then((response) => {
				// console.log("Task committed successfully:", response.data.task);
				const newtask = response.data.task;
				setTasks((prevTasks) => [...prevTasks, newtask]);
			})
			.catch((err) => {
				console.error("Error committing task to queue:", err);
				// alert("Failed to commit task. Please check the console for details.");
			});
	};

	return (
		<div className='w-[29%] bg-white/5 px-7 py-10 flex flex-col gap-7 text-white'>
			<div className='flex items-center gap-2'>
				<FontAwesomeIcon icon={faPlus} />
				<h1 className='text-3xl font-bold'>INJECT NEW TASK</h1>
			</div>

			<div className='flex flex-col gap-2'>
				<label className='text-sm tracking-wider font-semibold text-gray-400'>
					TASK TYPE
				</label>
				<select
					value={payloadType}
					onChange={(e) => setPayloadType(e.target.value)}
					className='bg-white/10 px-4 py-3 text-white border border-gray-600 rounded cursor-pointer'
				>
					<option value='Send_SMS' className='bg-black/90'>
						Send_SMS
					</option>
					<option value='Send_Email' className='bg-black/90'>
						Send_Email
					</option>
					<option value='generate_report' className='bg-black/90'>
						generate_report
					</option>
					<option value='process_image' className='bg-black/90'>
						process_image
					</option>
					<option value='database_backup' className='bg-black/90'>
						database_backup
					</option>
					<option value='video_transcode' className='bg-black/90'>
						video_transcode
					</option>
				</select>
			</div>

			<div className='flex flex-col gap-2'>
				<label className='text-sm tracking-wider font-semibold text-gray-400'>
					PAYLOAD CONFIGURATION
				</label>
				<textarea
					value={jsonConfig}
					onChange={(e) => setJsonConfig(e.target.value)}
					className='bg-black/50 px-4 py-3 text-green-400 font-mono border border-gray-600 rounded h-44 resize-none'
				/>
			</div>

			<button
				onClick={handleCommit}
				className='bg-white/5 hover:bg-white/10 border border-gray-600 text-white/90 py-4 text-lg tracking-wider transition cursor-pointer'
			>
				COMMIT TO QUEUE
			</button>
		</div>
	);
};

export default InjectNewBox;

import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const LiveExecutionFeed = ({ tasks }) => {
	return (
		<div id='LiveExec'>
			<h1 className='text-xl tracking-wider uppercase pb-7 px-3.5'>
				{" "}
				<FontAwesomeIcon icon={faBook} /> 
				{" "}Live Execution Feed
			</h1>
			<table>

				<tbody>
				<tr>
					<th>task id</th>
					<th>Payload Type</th>
					<th>Status</th>
				</tr>
				{tasks.map((task) => (
					<tr key={task.id}>
						<td>{task.task_id}</td>
						<td>{task.task_type}</td>
						<td>{task.status}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};

export default LiveExecutionFeed;

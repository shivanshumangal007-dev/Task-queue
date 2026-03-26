import React from "react";

const Numeral_dataBox = ({ title, current, total }) => {
	return (
		<div className='bg-white/5 px-7 py-10 text-white flex flex-col gap-4 justify-between h-full max-h-[40vh] w-full'>
			<h3 className='text-lg tracking-wider font-semibold text-gray-400'>
				{title}
			</h3>
			<div className='flex items-baseline gap-2'>
				<span className='text-5xl font-bold'>{current}</span>
				<span className='text-lg text-gray-500'>/ {total}</span>
			</div>
		</div>
	);
};

export default Numeral_dataBox;

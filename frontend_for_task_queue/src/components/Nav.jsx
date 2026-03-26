import React from 'react'

const Nav = () => {
  return (
		<div id='Nav' className='w-full h-[19vh] text-white flex justify-between items-center'>
			<div className='left_nav'>
				<h1 className='text-4xl font-bold uppercase text-white/90'>OBSIDIAN MONOLITH</h1>
				<h6 className='text-md font-normal text-white/80 uppercase tracking-[0.3vw] py-1'>Task Queue Orchestrator • System 0.4.2</h6>
			</div>
            <div className='right_nav bg-green-700/40 border-l-2 border-green-500/90 text-green-500/90 px-7 py-2'>
                <h4 className='text-lg font-medium capitalize'>redis - <span>connected</span></h4>
            </div>
		</div>
  );
}

export default Nav 

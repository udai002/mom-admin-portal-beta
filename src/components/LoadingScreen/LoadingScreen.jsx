import {DNA , InfinitySpin} from 'react-loader-spinner'

function LoadingScreen({title}){
    return <div className='bg-white h-screen w-full fixed top-0 left-0 flex flex-col justify-center items-center'>
        <InfinitySpin color='#00a99d'/>
        <p className='text-[#00a99d] font-bold'>{title || 'Loading'}...</p>
    </div>
}

export default LoadingScreen
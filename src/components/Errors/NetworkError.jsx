function NetworkError(){
    return  <div className="h-screen w-screen flex justify-center items-center">
        <img src="/Error.png" alt="Error" className="w-72 h-72" />
        <h1 className="text-center text-gray-400">OOPS! Our app feeling a little sick 
                       Try again soon</h1>
    </div>
}

export default NetworkError
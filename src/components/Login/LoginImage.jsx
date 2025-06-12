import {COLORS} from "../../constants/COLORS"

console.log(COLORS)

function LoginImage(){
    return <div className={`bg-[#00a99d] h-screen w-full md:w-1/2 flex flex-col p-10`}>
        <div className="flex flex-row items-center  gap-3">
            <img src="/logo.jpg" alt="mom pharmacy" className="w-14 h-12" />
            <h1 className="font-bold text-white text-xl">mompharmacy</h1>
        </div>
        <div className="flex justify-center items-center grow">
            <img src="/loginImage.png" alt="login" className="w-80 h-80 " />
        </div>
    </div>
}

export default LoginImage
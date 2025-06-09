import LoginForm from "../../components/Login/LoginForm"
import LoginImage from "../../components/Login/LoginImage"

function Login(){
    return <div className="w-full h-screen flex flex-wrap"> 
        <LoginImage/>
        <div className="p-12 w-full md:w-1/2">
            <div>
                <h1 className="font-bold text-2xl ">Welcome back to mom portal</h1>
                <p>Please enter your details</p>
            </div>
            <div className="flex justify-center items-center mt-10">
        <LoginForm/>

            </div>
        </div>
    </div>
}

export default Login
import { useNavigate } from "react-router"
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen"
import LoginForm from "../../components/Login/LoginForm"
import LoginImage from "../../components/Login/LoginImage"
import { useAdmin } from "../../context/AdminAuth"
import { useEffect } from "react"
import NetworkError from "../../components/Errors/NetworkError"

function Login(){

    const {isLoggedIn , loading , adminDetails , loginError} = useAdmin()
    const navigate = useNavigate()

    if(loading) return <LoadingScreen title={"Getting ready for you"}/>

    console.log(isLoggedIn , adminDetails)

    if(loginError) return <NetworkError/>



    if(isLoggedIn && adminDetails){
        navigate('/')
    }

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
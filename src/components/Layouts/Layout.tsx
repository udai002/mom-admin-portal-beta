import { Outlet, useNavigate } from "react-router"
import SideBar from "../Sidebar/SideBar"
import { useAdmin } from "../../context/AdminAuth"
import { useEffect } from "react"


function MainLayout({ children }) {

    const { loading, isLoggedIn, adminDetails } = useAdmin()
    const navigate = useNavigate()

    console.log("this is running", isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn]);

    return <>
        <SideBar />
        <main>
            <Outlet />
        </main>
    </>
}

export default MainLayout
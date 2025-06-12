import { useState } from "react";
import { motion } from "framer-motion";

import { IoMenu } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";
import { FiLogOut } from "react-icons/fi";
import { useAdmin } from "../../context/AdminAuth";

const DashboardOptionsList = [
    {
        id: 1,
        title: "Dashboard",
        link:"/"
    },
    {
        id: 2,
        title: "Users",

    },
    {
        id: 3,
        title: "Orders",
        link:"/orders"
    },
    {
        id: 4,
        title: "Medicines"
    },
    {
        id: 5,
        title: "Delivery boys",
        link:"/deliveryboys"
    },
    {
        id: 6,
        title: "Feedbacks",
        link:"/feedback"
    },

]

function OptionItems({ title, action , link  , setOpenBar}) {

    const navigate = useNavigate()

    function handleNavigation(){
        setOpenBar(false)
        navigate(link??"/")
    }

    return <li>
        <button className="p-2  border-b-2 border-gray-200 hover:bg-[#00a99d] ease-in duration-75 rounded-xl mt-4 w-full flex justify-between items-center" onClick={handleNavigation}>
            <p>{title}</p>
            <IoIosArrowForward />
        </button>

    </li>
}

function SideBar() {
    const [openBar, setOpenBar] = useState(false)
    

    const {logout , adminDetails} = useAdmin()

    function handleLogout(){
        logout()
    }
    
    function handleOpenOptions() {
        setOpenBar(!openBar)
    }

    return <div className="p-5 px-10 pt-8">
        <div className="flex justify-between pr-4 items-center z-0">
            <div className="flex items-center gap-3">

                <button className="p-4 bg-[#00a99d] rounded-full text-white" onClick={handleOpenOptions}>     
                    <IoMenu />
                </button>

                {/* <div>
                    <p className="font-bold text-black">Hi, {adminDetails?.username}</p>
                    <p className=" text-black">Welcome to mom portal!...</p>
                </div> */}

            </div>
            <div className="flex flex-row gap-3 items-center">
                <FaRegUserCircle className="text-2xl" color="black" />
                <p className="font-bold">{adminDetails?.username}</p>
                <button className="p-3 cursor-pointer" onClick={handleLogout}>
                    <FiLogOut className="text-xl"/>
                </button>

            </div>
        </div>

        {openBar && <><div className="bg-black/75 h-screen w-screen z-10 fixed top-0 left-0" onClick={handleOpenOptions} >
        </div>
            <motion.div initial={{ x: -200 }} animate={{ x: 0 }} transition={{ bounce: 0, duration: 0.2 }} className="fixed left-0 top-0 h-screen w-72 bg-white shadow-2xl shadow-black z-20  ">
                <div>
                    <div className="p-4 flex items-center gap-3 justify-center mt-5">
                        <img src="/logo.jpg" alt="" className="w-10 h-10 rounded-full" />
                        <p className="font-bold text-[#00a99d] text-2xl">mom portal</p>
                    </div>
                    <ul className="p-5">
                        {DashboardOptionsList.map(item => <OptionItems title={item.title} link={item.link} setOpenBar={setOpenBar} />)}
                    </ul>
                </div>
            </motion.div>
        </>}
    </div>
}

export default SideBar
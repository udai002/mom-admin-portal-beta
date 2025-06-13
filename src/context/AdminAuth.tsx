import { body } from "framer-motion/client";
import { useContext, createContext, useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router";


const AdminContext = createContext({
    adminDetails: null,
    isLoggedIn: false,
    loginAdmin: (username, password) => { },
    logout: () => { },
    loading: false,
    loginError: false
})

export function AdminProvider({ children }) {

    //states 
    const [adminDetails, setAdminDetails] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loginError, setLoginError] = useState(false)

    const navigate = useNavigate()


    async function getAdminDetails() {
            const token = localStorage.getItem("jwt_token")
            if(!token)setIsLoggedIn(false)
            try {
                const options = {
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                }
                setLoading(false)
                const response = await apiClient("/api/admin/admin", options)
                setLoading(false)
                if (response) {
                    setAdminDetails(response.data)
                    setIsLoggedIn(true)
                }
            } catch (error) {
                setLoginError(true)
                console.log("this is from admin auth", error)
            }
        }

    useEffect(() => {
        getAdminDetails()
    }, [])

    // login 
    async function loginAdmin(username, password) {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            }
            setLoading(true)
            const response = await apiClient("/api/admin/login", options)
            setLoading(false)
            if (response) {
                setIsLoggedIn(true)
                localStorage.setItem("jwt_token", response.jwtToken)
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            setLoginError(true)
            return false
        }
    }

    // logout 
    function logout() {
        localStorage.removeItem("jwt_token")
        navigate('/login')
    }

    return <AdminContext.Provider value={{ adminDetails, isLoggedIn, loginAdmin, logout, loading, loginError }}>
        {children}
    </AdminContext.Provider>
}

export function useAdmin() {
    const context = useContext(AdminContext)
    if (!context) {
        throw new Error("Admin context is not defined")
    }
    return context
}




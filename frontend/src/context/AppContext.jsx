import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import axios from 'axios';
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = "$"
    const backend_Url = "https://medi-care-backend1.onrender.com"

    //if you login and refresh the page then to stay still on login page this logic is for.
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [doctors, setDoctors] = useState([])
    const [userData, setUserData] = useState(false)


    const getDoctorsData = async () => {

        try {

            const { data } = await axios.get(backend_Url + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {

            const { data } = await axios.get(backend_Url + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        token, setToken,
        backend_Url,
        userData,setUserData,
        loadUserProfileData

    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider

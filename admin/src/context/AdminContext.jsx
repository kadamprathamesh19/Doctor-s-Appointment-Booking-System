import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backend_Url = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {

        try {

            const { data } = await axios.post(backend_Url + '/api/admin/all-doctors', {}, { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }


    const changeAvailablity = async (docId) => {

        try {

            const { data } = await axios.post(backend_Url + '/api/admin/change-availablity', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {

        try {

            const { data } = await axios.get(backend_Url + '/api/admin/appointments', { headers: { aToken } })

            if (data.success) {
                setAppointments(data.appointments)
            } else {
                toast.error(data.error)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backend_Url + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async () => {

        try {

            const { data } = await axios.get(backend_Url + '/api/admin/dashboard', { headers: { aToken } })
            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const value = {
        aToken, setAToken,
        backend_Url, doctors,
        getAllDoctors, changeAvailablity,
        appointments, setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider


import React, { useState, createContext, useContext } from 'react'
import Wrapper from '../assets/wrappers/Dashboard'
import { Outlet , redirect , useLoaderData , useNavigate} from 'react-router-dom'
import SmallSidebar from '../components/SmallSidebar'
import BigSidebar from '../components/BigSidebar'
import Navbar from '../components/Navbar'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'


const DashboardContext = createContext()

export const loader = async  () => {
    try {
        const {data} = await customFetch.get('/users/getCurrent')
        return data
    }catch(error) {
        return redirect('/')
    }
}

const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('dark-theme') === 'true'
    document.body.classList.toggle('dark-theme' , isDarkTheme)
    return isDarkTheme
}
const DashboardLayout = ({isDarkThemeEnabled}) => { 

    const {user} = useLoaderData()
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState( isDarkThemeEnabled || false)

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme
        setIsDarkTheme(newDarkTheme)
        document.body.classList.toggle('dark-theme', newDarkTheme)
        localStorage.setItem('dark-theme', newDarkTheme)
        console.log('toogle dark theme')
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    console.log(showSidebar)

    const LogoutUser = () => {
        try {
        navigate('/')
        customFetch.get('/auth/logout')
        toast.success('Logging out..')
        }catch(error) {

        }
    }

    return (
        <DashboardContext.Provider value={{
            user,
            showSidebar,
            isDarkTheme,
            toggleDarkTheme,
            toggleSidebar,
            LogoutUser
        }}>
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">
                            <Outlet context={{user}} />
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout

import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { HomeLayout, Register, Login, DashboardLayout, Error , Landing , AddJob } from "./pages"
import { action as registerAction } from "./pages/Register"
import {action as loginAction} from './pages/Login'
import { loader as dashboardLoader } from "./pages/DashboardLayout"






const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('dark-theme') === 'true'
  document.body.classList.toggle('dark-theme' , isDarkTheme)
  return isDarkTheme
}

const isDarkThemeEnabled = checkDefaultTheme();





const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index : true,
        element : <Landing/>
      },
      {
        path: 'register',
        element: <Register />,
        action : registerAction
      },
      {
        path: 'login',
        element: <Login />,
        action : loginAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader : dashboardLoader,
        children : [
          {index : true , element : <AddJob/> }
        ]
      }
    ],
    errorElement : <Error />
  },
])


const App = () => {
  return <RouterProvider router={router} />
}

export default App
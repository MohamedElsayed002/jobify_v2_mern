
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { HomeLayout,
        Register,
        Login,
        DashboardLayout,
        Error,
        Landing,
        AddJob,
        AllJobs ,
        EditJob , 
        DeleteJob,
        Profile,
        Admin } from "./pages"
import { action as registerAction } from "./pages/Register"
import { action as loginAction } from './pages/Login'
import { loader as dashboardLoader } from "./pages/DashboardLayout"
import { action as addJob } from "./pages/AddJob"
import { loader as allJobsLoader } from "./pages/AllJobs"
import {loader as editJobLoader} from './pages/EditJob'
import {action as editJobAction} from './pages/EditJob'
import { action as deleteJobAction } from "./pages/DeleteJob"
import {loader as AdminLoader} from './pages/Admin'
import {action as ProfileAction} from './pages/Profile'





const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('dark-theme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}

const isDarkThemeEnabled = checkDefaultTheme();





const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddJob />, action: addJob },
          {path : 'admin' , element : <Admin/> , loader : AdminLoader} ,
          { path: 'all-jobs', element: <AllJobs />, loader: allJobsLoader },
          { path : 'profile' , element : <Profile /> , action : ProfileAction},
          {path : 'edit-job/:id' , element : <EditJob /> , loader : editJobLoader , action : editJobAction},
          {path : 'delete-job/:id' , element : <DeleteJob/> , action : deleteJobAction } 
        ]
      }
    ],
    errorElement: <Error />
  },
])


const App = () => {
  return <RouterProvider router={router} />
}

export default App
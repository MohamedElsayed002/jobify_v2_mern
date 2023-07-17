

import axios from "axios"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import FormRow from "../components/FormRow"
import Logo from "../components/Logo"
import { Form , redirect, useNavigation,Link } from 'react-router-dom'
import { toast } from "react-toastify"
import customFetch from "../utils/customFetch"


export const action = async ({request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
        let LoginData = await customFetch.post('/auth/login',data)
        toast.success('Login successfully')
        return redirect('/dashboard')

    }catch(e) {
        toast.error(e.response.data.msg)
        return e
    }
}


const Login = () => {


    const navigation = useNavigation()
    console.log(navigation)
    const isSubmitting = navigation.state === 'submitting'

    return (
        <Wrapper>
            <Form method="post" className="form">
                <Logo />
                <h4>Login</h4>
                <FormRow
                    type="email"
                    name="email"
                    defaultValue="johndoe@example.com"
                />
                <FormRow
                    type="password"
                    name="password"
                    defaultValue="passwod"
                />
                <button type="submit" className='btn btn-block' disabled={isSubmitting}>
                    {isSubmitting ? 'submitting...' : 'submit'}
                </button>
                <button type="button" className="btn btn-block">
                    explore the app
                </button>
                <p>
                    need an account?
                    <Link to="/register" className="member-btn">
                        Register
                    </Link>
                </p>
            </Form>
        </Wrapper>
    )
}

export default Login
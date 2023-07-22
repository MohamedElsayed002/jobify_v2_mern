


import { Form , redirect, useNavigation,Link } from 'react-router-dom'
import FormRow from '../components/FormRow'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import Logo from '../components/Logo'
import axios from 'axios'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'


export const action = async ({request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
        let gamed = await customFetch.post('/auth/register' , data)
        toast.success('Registration successfully')
        return redirect('/login')
        
    }catch (e) {
        toast.error(e?.response.data?.msg)
    }
    return null
}


const Register = () => {

    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'


    return (
        <Wrapper>
            <Form method='post' className="form">
                <Logo />
                <h4>Register</h4>
                <FormRow
                    type="text"
                    name="name"
                    defaultValue="john"
                />
                <FormRow
                    type="text"
                    name="lastName"
                    labelText="last name"
                    defaultValue="doe"
                />
                <FormRow
                    type="text"
                    name="location"
                    labelText="location"
                    defaultValue="milkyWay,Earth"
                />
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
                <p>
                    Already a member?
                    <Link to="/login" className="member-btn">
                        Login
                    </Link>
                </p>
            </Form>
        </Wrapper>
    )
}

export default Register
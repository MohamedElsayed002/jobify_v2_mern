
import FormRow from '../components/FormRow'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useLoaderData, Form, useNavigation, redirect } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const loader = async ({ params }) => {
    console.log(params.id)
    try {
        const { data } = await customFetch.get(`/jobs/${params.id}`)
        return data
    } catch (error) {
        toast.error(error.response.data.msg)
        return redirect('/dashboard/all-jobs')
    }
}

export const action = async ({request,params}) => {

    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        await customFetch.patch(`/jobs/${params.id}` , data) 
        toast.success('Job updated successfully')
        return redirect('/dashboard/all-jobs')
    }catch(error) {
        toast.error(error.response.data.msg)
        return error

    }
}


const EditJob = () => {

    const { job } = useLoaderData()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">edit job</h4>
                <div className="form-center">
                    <FormRow type="text" name="position" defaultValue={job.position} />
                    <FormRow type="text" name="company" defaultValue={job.company} />
                    <FormRow type="text" name="jobLocation" labelText='job location' defaultValue={job.jobLocation} />
                    <div className="form-row">
                        <label htmlFor="jobType" className="form-label">
                            job type
                        </label>
                        <select name="jobType" id="jobType" className="form-select" defaultValue={job.jobStatus}>
                            {
                                Object.values(JOB_TYPE).map((itemValue) => {
                                    return (
                                        <option key={itemValue} value={itemValue}>
                                            {itemValue}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-row">
                        <label htmlFor="jobStatus" className="form-label">
                            job Status
                        </label>
                        <select name="jobStatus" id="jobStatus" className="form-select" defaultValue={job.jobStatus}>
                            {
                                Object.values(JOB_STATUS).map((itemValue) => {
                                    return (
                                        <option key={itemValue} value={itemValue}>
                                            {itemValue}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button type="submit" className="btn btn-block form-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'submitting..' : 'submit'}
                    </button>
                </div>
            </Form>
        </Wrapper>
    )
}

export default EditJob
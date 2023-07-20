


import Job from "./Job"
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from "../pages/AllJobs"


const JobContainer = () => {

    const { data } = useAllJobsContext()
    const { jobs } = data
    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h1>No Jobs Available</h1>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div className="jobs">
                {
                    jobs.map((job) => {
                        return <Job key={job._id} {...job} />
                    })
                }
            </div>
        </Wrapper>
    )
}

export default JobContainer



import React from 'react'
import styled from 'styled-components'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const StyledBtn = styled.button`
    font-size : 1.5rem;
    background : red;
    color : white;
`

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo/>
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>job <span>tracking</span>app</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sint vitae recusandae assumenda sequi nisi earum distinctio et adipisci, amet commodi ipsam illo eveniet? Labore eveniet nulla ipsum omnis cupiditate.
                    </p>
                    <Link to="/register" className="btn register-link">
                        Register
                    </Link>
                    <Link to="/login" className="btn">
                        Login / Demo User
                    </Link>
                </div>
                <img src={main} alt="job hunt" className="img main-img" />
            </div>
        </Wrapper>
    )
}

export default Landing
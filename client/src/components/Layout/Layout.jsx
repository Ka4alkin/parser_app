import {Outlet, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CustomLink from "./CustomLink.jsx";
import Button from "react-bootstrap/Button";
import {isLogin} from "../../hooks/IsLogin.jsx";

const Layout = () => {
    const {isAuthorized, setAuthorized} = isLogin()
    const navigate = useNavigate()

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <CustomLink to="/"><h4>Home</h4></CustomLink>
                    {!!isAuthorized && <>
                        <Nav className="me-auto">
                            <CustomLink to="/posts"><h4>Posts</h4></CustomLink>
                        </Nav>
                    </>}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {!!isAuthorized &&
                            <>
                                <Nav className="me-auto">
                                    <Button onClick={() => {
                                        localStorage.setItem('token', null)
                                        setAuthorized(false)
                                        navigate('/login')
                                        window.location.reload();
                                    }
                                    }
                                            variant="primary">Log Out</Button>
                                </Nav>
                            </>
                        }
                        {!isAuthorized &&
                            <>
                                <Nav className="me-auto">
                                    <CustomLink to="/login"><h4>Login</h4></CustomLink>
                                </Nav>
                                <Nav className="me-auto">
                                    <CustomLink to="/register"><h4>Register</h4></CustomLink>
                                </Nav>
                            </>}
                    </div>
                </Container>
            </Navbar>
            <Container>
                <Outlet/>
            </Container>
        </>
    )
};

export default Layout;
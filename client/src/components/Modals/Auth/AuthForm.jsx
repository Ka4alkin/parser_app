import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {login, register} from "../../../API.jsx";
import alert from "alerts";
import {isLogin} from "../../../hooks/IsLogin.jsx";
import {useNavigate} from "react-router-dom";


const AuthForm = ({confirmBtnText, loginForm}) => {

    const [userName, setUserName] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const {setAuthorized} = isLogin()
    const navigate = useNavigate()
    const _onLogin = async () => {
        const data = {
            username: userName, password
        }
        const res = await login(data)
        if (res.message) {
            alert(res.message, {timeout: 4000, className: 'alert-error'})
            return
        } else {
            localStorage.setItem('token', res.token)
            setAuthorized(true)
            navigate('/posts')
            window.location.reload();
        }
    }

    const _onRegister = async () => {
        const data = {
            username: userName, password
        }
        const res = await register(data)
        if (res.message) {
            alert(res.message, {timeout: 4000, className: 'alert-error'})
            return
        } else {
            alert('successfully registered', {timeout: 4000})
        }
    }

    return <>
        <Form  onSubmit={(event) =>{
            event.preventDefault()
            loginForm ? _onLogin() : _onRegister()
        }}>
            <Form.Label htmlFor="username">User name</Form.Label>
            <Form.Control
                required={true}
                minLength={3}
                onChange={e => setUserName(e.target.value)}
                type="username"
                id="username"
            />
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
                required={true}
                minLength={3}
                onChange={e => setPassword(e.target.value)}
                type="password"
                id="inputPassword"
            />
            <Button type={'submit'}   variant="primary">
                {confirmBtnText}
            </Button>
        </Form>
    </>;
};

export default AuthForm;
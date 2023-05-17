import AuthForm from "../../components/Modals/Auth/AuthForm.jsx";

const Login = () => {

    return <>
        <AuthForm loginForm={true} confirmBtnText={'login'}/>
    </>;
};

export default Login
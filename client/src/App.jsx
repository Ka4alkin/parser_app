import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Posts from "./pages/Posts/Posts.jsx";
import NoPage from "./pages/NoPage/NoPage.jsx";
import './App.scss'
import PostDetail from "./pages/PostDetail/PostDetail.jsx";
import Login from "./pages/Login/Login.jsx";
import {isLogin} from "./hooks/IsLogin.jsx";
import Register from "./pages/Register/Register.jsx";

function App() {

    const {isAuthorized} = isLogin()


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    {!!isAuthorized && <>
                        <Route path="posts" element={<Posts/>}/>
                        <Route path='post/:id' element={<PostDetail/>}/>
                    </>
                    }
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

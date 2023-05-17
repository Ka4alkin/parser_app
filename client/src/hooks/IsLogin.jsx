import {useState} from "react";

const checkLogin = () => {
    let token = localStorage.getItem('token')
    if (token === 'null') return false
    if (token) return true
    else return false
}
export const isLogin = () => {
    const [isAuthorized, setAuthorized] = useState(checkLogin())
    return {isAuthorized, setAuthorized}
}
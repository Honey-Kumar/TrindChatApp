import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export const useAuthToken = () => {
    const { isLoggedin, isLoggedout } = useSelector(state => state.Auth);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenFromCookie = Cookies.get('authtoken');
        if (tokenFromCookie) {
            setToken(tokenFromCookie);
        } else {
            setToken(null);
        }
    }, [isLoggedin, isLoggedout]);
    console.log("token : ", token)
    return token;
};
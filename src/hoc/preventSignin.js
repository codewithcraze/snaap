import { useEffect } from "react";
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux";
const PreventSignin = (props) => {

    const state = useSelector((state) => state.users);

    useEffect(()  => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // 1 day expiration time
        const expiresString = expires.toUTCString();
        document.cookie = `x-access-token=${state.data.token}; expires=${expiresString}; path=/; secure; samesite=strict`;
    }, [state]);

    return(
        <>
            {state.auth ?
                <Navigate to="/dashboard" />
                :
                props.children
            }
        </>
    )
}

export default PreventSignin;
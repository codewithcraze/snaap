import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const RouteGuard = (props) => {
    const users = useSelector(state => state.users); 
    if(!users.auth){
       return <Navigate to="/" />
    }
    return props.children
}

export default RouteGuard;

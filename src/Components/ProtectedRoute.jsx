import { Navigate } from "react-router";
const ProtectedRoute=({children})=>{
    const isLoggedIn=sessionStorage.getItem('isLoggedIn')==='true'
    const role=sessionStorage.getItem('role')==='admin'

    return(
        isLoggedIn && role?children:<Navigate to="/"/>
    )
}
export default ProtectedRoute
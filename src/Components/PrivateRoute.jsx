import { Navigate } from "react-router";
const PrivateRoute=({children})=>{
    const isLoggedIn=sessionStorage.getItem('isLoggedIn')==='true'
    const role=sessionStorage.getItem('role')
    return(
        isLoggedIn && role==='admin'?children:<Navigate to="/admin"/>
    )
}
export default PrivateRoute
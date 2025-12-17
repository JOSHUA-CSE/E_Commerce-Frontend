import { useParams } from "react-router"
const ProductDetails=()=>{
    const {id}=useParams()
 return(

    <>
        <h1>Product ID:{id}</h1>
    </>
 )
}
export default ProductDetails
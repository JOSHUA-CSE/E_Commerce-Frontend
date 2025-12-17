import { Link } from "react-router"


const Header=()=>{
    return(
    <>
        <nav className="flex flex-row justify-center bg-fuchsia-700 w-full  gap-[320px]">
            <div className="p-5">
                <img src="src\colorful-bird-illustration-gradient_343694-1741.avif" className="h-[80px] rounded-full"></img>
            </div>
            <div className="flex fles-row justify-center items-center gap-5 p-3">
                <Link to="/" className="bg-fuchsia-200 p-4 rounded-lg  font-bold">HOME</Link>
                <Link to="/products" className="bg-fuchsia-200 p-4 rounded-lg  font-bold">PRODUCTS</Link>
                <Link to="/cart" className="bg-fuchsia-200 p-4 rounded-lg  font-bold">CART 🛒</Link>
                <Link to="/orders" className="bg-fuchsia-200 p-4 rounded-lg  font-bold">ORDERS</Link>



            </div>
            <div className="flex flex-row justify-right items-center gap-10">
                <div><Link to="/login"><button className="bg-fuchsia-200 p-4 rounded-lg  font-bold">LOGIN</button></Link></div>
                <div><Link to="/register"><button className="bg-fuchsia-200 p-4 rounded-lg  font-bold">SIGNUP</button></Link></div>
            </div>
        </nav>
    </>
    )
}
export default Header
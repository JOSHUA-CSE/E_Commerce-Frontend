import axios from "axios";
import { Await, Link } from "react-router";

const ProductCard=(props)=>{
    const {id,name,price,image}=props
     const handleAdd= async (e) => {
        e.preventDefault();
        const userId=localStorage.getItem('userId');
        if(!userId){
            alert('Please login first');
            return;
        }
        const res=await axios.post(`http://localhost:3000/cart`,{
            userId:userId,
            productId: id,
            quantity: 1
        });
        console.log('axios=>',res)
    }
    return(
        <Link to={`/products/${id}`}>
        <div className="w-[300px] p-4 flex flex-col shadow-xl shadow-fuchsia-900 rounded-xl m-5 bg-fuchsia-500 " >
            <div>
                <img src={image} alt={name} className="w-full h-[200px] object-cover p-2 rounded-md" />
            </div>
            <div className="p-4 flex flex-col shadow-lg rounded-lg m-1 bg-white">
                <h1 className="text-xl font-semibold">{name}</h1>
                                <p className="text-xl text-right font-bold">
                                        ${
                                            (() => {
                                                const num = typeof price === 'number' ? price : parseFloat(price);
                                                return !isNaN(num) ? num.toFixed(2) : '';
                                            })()
                                        }
                                </p>
                <button className="bg-fuchsia-200 p-4 rounded-lg w-full font-bold items-right" onClick={handleAdd}>Add to Cart</button>
            </div>
        </div>
        </Link>
    )
}

export default ProductCard;
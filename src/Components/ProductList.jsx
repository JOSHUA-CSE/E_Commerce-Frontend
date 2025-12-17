import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


const ProductList = () => {
    const [products,setProducts]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await fetch(`http://localhost:3000/products`)
            const data=await response.json()
            setProducts(data)
        }
        fetchData()
    },[])
    return (
        <div className="flex flex-row my-3 gap-10 flex-wrap">
        {products.map((product)=>{
            return (
                <ProductCard
                  key={product._id || product.id}
                  id={product._id || product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />
            )
        })}
    </div>
    )
}


export default ProductList;
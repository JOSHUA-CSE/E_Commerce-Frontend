import { useEffect, useState } from "react"
import Counter from "./Counter"
import Header from "./Header"
import OrderSummary from "./OrderSummary"
import axios from "axios"


const Cart = () => {
    const [products, setProducts] = useState([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`https://e-commerce-backend-h8xm.onrender.com/cart`)
    //         const data = await response.json()
    //         setProducts(data)
    //     }
    //     fetchData()
    // }, [])
    // axios provides easy way to call api's
    useEffect(() => {
        const fetchData = async () => {
            const userId=localStorage.getItem('userId');
            if(!userId){
                console.log('No userId found');
                return;
            }
            const response = await axios.get(`https://e-commerce-backend-h8xm.onrender.com/cart?userId=${userId}`)
            console.log(response.data)
            setProducts(response.data)
        }
        fetchData()
    }, [])
    const handleCancel=async (e, productId) => {
        e.preventDefault();
        try{
            const userId=localStorage.getItem('userId');
            const res=await axios.delete(`https://e-commerce-backend-h8xm.onrender.com/cart/${productId}`, {
                data: { userId }
            })
            console.log('axios=>',res)
            setProducts(prev => prev.filter(item => (item._id ?? item.id ?? item.name) !== productId))
        }catch(err){
            console.error('Delete failed', err)
        }
    }
    const handleBuy=async (e, productId) => {
        e.preventDefault();
        try{
            const res=await axios.Post(`https://e-commerce-backend-h8xm.onrender.com/orders`)
            console.log('axios=>',res)
            setProducts(prev => prev.filter(item => (item._id ?? item.id ?? item.name) !== productId))
        }catch(err){
            console.error('Buy failed', err)
        }
    }

    const setProductQuantity = (productId) => async (nextQuantity) => {
        const safeQuantity = Math.max(1, nextQuantity)
        // Optimistically update UI
        setProducts((prev) =>
            prev.map((item) =>
                (item._id ?? item.id ?? item.name) === productId
                    ? { ...item, quantity: safeQuantity }
                    : item
            )
        )
        try{
            await axios.patch(`https://e-commerce-backend-h8xm.onrender.com/cart/${productId}`, { quantity: safeQuantity })
        }catch(err){
            console.error('Quantity update failed', err)
        }
    }

    const totalQuantity = products.reduce(
        (sum, item) => sum + (Number(item.quantity) || 1),
        0
    )

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-10">
            <div className="flex-1 space-y-6">
                {products.length === 0 && (
                    <p className="text-lg text-gray-700">Your cart is empty.</p>
                )}

                {products.map((product) => {
                    const productKey = product._id ?? product.id ?? product.name
                    const currentQuantity = Number(product.quantity) || 1

                    return (
                        <div
                            key={productKey}
                            className="w-full bg-fuchsia-600 p-6 rounded-lg"
                        >
                            <div className="w-full bg-pink-200 rounded-2xl shadow-2xl p-6 flex justify-between">
                                <div className="flex flex-row items-center gap-4">
                                    <div>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-40 h-40 object-contain rounded-lg shadow"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold">{product.name}</h2>
                                        <Counter
                                            quantity={currentQuantity}
                                            setQuantity={setProductQuantity(productKey)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-6">
                                    <button className="text-xl font-bold border border-black rounded-full w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-200" onClick={(e) => handleCancel(e, productKey)}>
                                        ❌
                                    </button>
                                    <p className="text-2xl font-bold">{product.price}</p>
                                    <button className="px-10 py-2 border bg-indigo-400 border-black rounded-lg hover:bg-white" onClick={handleBuy}>
                                        Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex flex-col items-start justify-center bg-fuchsia-600 p-10 rounded-lg">
                <OrderSummary quantity={totalQuantity} setQuantity={() => {}} />
            </div>
        </div>
    )
}

export default Cart
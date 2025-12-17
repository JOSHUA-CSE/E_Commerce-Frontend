
const Counter=(props)=>{
    const {quantity,setQuantity}=props
    const handleIncrement=()=>{
        setQuantity(quantity+1)
    }
    const handleDecrement=()=>{
        setQuantity(quantity-1)
    }
    return(
    <>
        <div className="flex flex-col justify-center ">
            <div>Quantity</div>
            <div className="flex flex-row">
                <button className="text-center border-2 m-1 w-full p-3 rounded-lg" onClick={handleDecrement}>-</button>
                <p className="text-center border-2 m-1 w-full p-3 rounded-lg">{quantity}</p>
                <button className="text-center border-2 w-full m-1 p-3 rounded-lg" onClick={handleIncrement}>+</button>
            </div>
        </div>
    </>
    )
}
export default Counter
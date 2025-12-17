const OrderSummary=(props)=>{
  const {quantity,setQuantity}=props
  const subtotal = 4000*quantity;
  const discount = (subtotal*10/100);
  const finalPrice = subtotal - discount;

  return (
    <div className="w-[300px] bg-pink-200 rounded-2xl shadow-xl p-6 flex flex-col gap-4">

      <h2 className="text-2xl font-semibold text-gray-700">Order Summary</h2>

      <div className="flex justify-between text-lg">
        <span>Subtotal:</span>
        <span className="font-medium">₹{subtotal}</span>
      </div>

      <div className="flex justify-between text-lg text-green-600">
        <span>Discount:</span>
        <span className="font-bold">- ₹{discount}</span>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between text-xl font-bold">
        <span>Total:</span>
        <span>₹{finalPrice}</span>
      </div>

      <button className="w-full mt-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
        Checkout
      </button>

    </div>
  );
}

export default OrderSummary;
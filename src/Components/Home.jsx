import { Link, Navigate } from "react-router"

const Home=()=>{
    
const products = [
  {
    id: 1,
    name: "Smart Watch",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Gaming Headset",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop",
  },
];

    return(
    <>
        <div className="flex flex-col min-h-screen p-10 bg-fuchsia-500">

      <h1 className="text-3xl font-bold text-center mb-10 text-white">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">

        {products.map((item) => (
          <div
            key={item.id}
            className="w-[300px] p-4 flex flex-col shadow-xl shadow-fuchsia-900 rounded-xl bg-fuchsia-500"
          >
            <div>
              <img src={item.image} className="rounded-full p-2" alt={item.name} />
            </div>

            <div className="p-4 flex flex-col shadow-lg rounded-lg m-1 bg-white">
              <h1 className="text-xl font-semibold">{item.name}</h1>
              <p className="text-xl text-right font-bold">${item.price}</p>
            </div>
          </div>
        ))}

      </div>
      <div className="flex justify-center mt-10">
        <a href='/products'><button className="bg-fuchsia-200 px-8 py-3 rounded-lg text-lg font-semibold transition">
          Visit More Products
        </button></a>
      </div>

    </div>
        <footer className="bg-fuchsia-700 flex flex row gap-[100px] h-full justify-center">
            <div className="text-white items-left">
                <h1 className="font-bold text-xl ">ABOUT</h1>
                <p>Your trusted store for quality products at the best prices.</p>
                <p>@2025 All Rights Support</p>
            </div>
            
             <div className="text-white items-left">
                <h1 className="font-bold text-xl ">SUPPORT</h1>
                <p>FAQ</p>
                <p>Shipping</p>
                <p>Help</p>
            </div>
            
             <div className="text-white items-left">
                <h1 className="font-bold text-xl ">CONTACT</h1>
                <p>E-Mail:shop@gmail.com</p>
                <p>phone:+91 7687646547</p>
            </div>
            <div className="text-white items-left">
                <h3 className="font-bold text-xl ">Quick Links</h3>
                <ul>
                    <li><Link to="#">Home</Link></li>
                    <li><Link to="#">Shop</Link></li>
                    <li><Link to="#">Offers</Link></li>
                    <li><Link to="#">Contact</Link></li>
                </ul>
            </div>

        </footer>
    </>

    )
}
export default Home
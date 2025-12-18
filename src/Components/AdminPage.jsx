import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AdminPage=()=>{
    const [productname,setproductname]=useState('');
    const [image,setimage]=useState('');
    const [sellingprice,setsellingprice]=useState('');

    const [products,setProducts]=useState([])
    
    useEffect(()=>{
        fetchProducts();
    },[])
    
    const fetchProducts = async()=>{
        try{
            const response=await fetch(`https://e-commerce-backend-h8xm.onrender.com/products`)
            const data=await response.json()
            setProducts(data)
        }catch(error){
            console.error('Error fetching products:', error)
            toast.error('Failed to fetch products')
        }
    }
    const handleProductname = (e) => {
        setproductname(e.target.value)
    }

    const handleImage = (e) => {
        setimage(e.target.value)
    }

    const handleSellingprice= (e) => {
        setsellingprice(e.target.value);
    }

    const addProduct = async (name, imageUrl, price) => {
        try {
            console.log('Adding product:', { name, imageUrl, price });

            const newProduct = {
                name: name,
                image: imageUrl,
                price: parseFloat(price)
            };

            console.log('Sending to backend:', newProduct);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const response = await fetch('https://e-commerce-backend-h8xm.onrender.com/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                throw new Error(`Failed to add product: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            toast.success('Product added successfully!');
            setproductname('');
            setimage('');
            setsellingprice('');
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
            console.error('Error name:', error.name);
            if (error.name === 'AbortError') {
                toast.error('Request timeout - Backend not responding');
            } else {
                toast.error('Failed to add product: ' + error.message);
            }
        }
    }

    const handleAdd = (e) => {
        e.preventDefault();
        console.log('Handle Add called');
        console.log('Form values:', { productname, image, sellingprice });
        
        if(!productname || !image || !sellingprice) {
            console.log('Validation failed');
            toast.warning('Please fill name, image, and price');
            return;
        }
        console.log('Validation passed, calling addProduct');
        addProduct(productname, image, sellingprice)
    }


    return (
        <>
            <div className="mt-10 w-[500px] flex flex-col  mx-auto p-2 bg-fuchsia-200 shadow-lg rounded-xl ">
                <form onSubmit={handleAdd} className="flex flex-col ml-15">
                <h1 className="font-bold text-2xl mb-5 pt-5 text-center">Add Product</h1>
                <label className="font-bold ">Name:</label>
                <input type="text" placeholder="Product name" className="border p-2 rounded-[5px] w-[85%]" 
                value={productname} onChange={handleProductname}/>
                <label className="font-bold mt-5">Image-Url:</label>
                <input type="text" placeholder="Product image url" className="border p-2 rounded-[5px] w-[85%] " 
                value={image} onChange={handleImage}/>
                <label className="font-bold mt-5">Price:</label>
                <input type="number" placeholder="Price" className="border p-2 rounded-[5px] w-[85%]"
                value={sellingprice} onChange={handleSellingprice} />
                <button type="submit" className="bg-orange-600 text-white text-lg p-2 py-2 rounded-lg mt-5 ml-20 w-[50%] mb-5">Add</button>
                </form>
                </div>
        </>
    )
}
export default AdminPage
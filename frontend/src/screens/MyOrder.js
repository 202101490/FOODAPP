// import React, { useEffect, useState } from 'react'
// import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'

// export default function MyOrder() {

//     const [orderData, setorderData] = useState("")

//     const fetchMyOrder = async () => {
//         console.log(localStorage.getItem('userEmail'))
//         await fetch("http://localhost:5000/api/MyorderData", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: localStorage.getItem('userEmail')
//             })
//         }).then(async (res) => {
//             let response = await res.json()
//             console.log(response)

//             await setorderData(response)
//         })
//     }

//     useEffect(() => {
//         fetchMyOrder()
//     }, [])
   
//     return (
//         <div>
//             <div>
//                 <Navbar />
//             </div>

//             <div className='container'>
//                 <div className='row'>
//                     {/* Render Order Data */}
//                     {Object.keys(orderData).length > 0 ? Object.values(orderData).map((data, index) => {
//                         return (
//                             data.orderData ? data.orderData.order_data.slice(0).reverse().map((item, itemIndex) => {
//                                 return (
//                                     <div key={itemIndex}>
//                                         {item.Order_date ? (
//                                             <div className='m-auto mt-5'>
//                                                 <div>{item.Order_date}</div>
//                                                 <hr />
//                                             </div>
//                                         ) : (
//                                             <div className='col-12 col-md-6 col-lg-3'>
//                                                 <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
//                                                     {/* Uncomment if you have an image */}
//                                                     {/* <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
//                                                     <div className="card-body">
//                                                         <h5 className="card-title">{item.name}</h5>
//                                                         <div className='container w-100 p-0' style={{ height: "38px" }}>
//                                                             <span className='m-1'>{item.qty}</span>
//                                                             <span className='m-1'>{item.size}</span>
//                                                             <span className='m-1'>{item.Order_date}</span>
//                                                             <div className='d-inline ms-2 h-100 w-20 fs-5'>
//                                                                 ₹{item.price}/-
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 )
//                             }) : null
//                         )
//                     }) : null}
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     )
// }
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        const response = await fetch("http://localhost:5000/api/MyorderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        });

        const data = await response.json();
        console.log(data);
        setOrderData(data.orderdata); // Fixing the key reference
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mt-3">
                <h2>My Orders</h2>
                {orderData && orderData.order_data ? (
                    orderData.order_data.map((order, index) => (
                        <div key={index} className="card mb-3 p-3">
                            <h4>Order Date: {order[0].order_date}</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.slice(1).map((item, itemIndex) => (
                                        <tr key={item.id || itemIndex}>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.size}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <p>Loading or No Orders Found...</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

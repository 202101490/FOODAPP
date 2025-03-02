import React, { useEffect, useRef, useState } from 'react'
import { useCart,useDispatchCart } from './ContextReducer';

export default function Card(props) 
{
    let dispatch=useDispatchCart()
    let data=useCart()
    const priceRef=useRef()
    let foodItem = props.item;  
    let options = props.options;
    let priceoptions = Object.keys(options);
    const [qty,setqty]=useState(1)
    const [size,setsize]=useState("")
     const handleaddtocart=async()=>
     {
        let food = []
        for (const item of data) {
          if (item.id === foodItem._id) {
            food = item;
            break;
          }
        }
        console.log(food)   
        console.log(new Date())
        if (Object.keys(food).length>0) {
            // console.log("i am your adada")
            if (food.size === size) {
                
              await dispatch({ type: "UPDATE", id: foodItem._id, price: finalprise, qty: qty })
              return
            }
            else if (food.size !== size) {
              await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalprise, qty: qty, size: size,img: props.ImgSrc })
              console.log("Size different so simply ADD one more to the list")
              return
            }
            return
          }
      
        await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,price:finalprise,qty:qty,size:size})
        console.log(data)
     }
     useEffect(()=>{
        setsize(priceRef.current.value)
     },[])
    let finalprise=qty*parseInt(options[size]);
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.ImgSrc}  className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        <p className="card-text">Some quick example content.</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100  bg-success rounded' onChange={(e)=>setqty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100  bg-success rounded ' ref={priceRef} onChange={(e)=>setsize(e.target.value)}>
                                {priceoptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline fs-5'>₹{finalprise}/-</div>
                        </div>
                        <hr></hr>
                        <button className={`btn btn-success justify-content ms-2`} onClick={handleaddtocart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

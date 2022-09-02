import React, { useEffect, useState } from "react";
import './Products';
import { useDispatch } from "react-redux";
// import {remove} from '../store/cartSlice';
import { useSelector } from 'react-redux';
import {deleteQty,addQty} from '../store/dataSlice';

function Cart(){
   
    // const arr = useSelector((state)=>state.cart);
    let arr = useSelector((state)=>state.data).data;
    arr = arr.filter(item=>item.qty>0);
    const user = useSelector((state)=>state.login);
    const isLoggedIn = user.status;
    const name = user.name;
   
    const [amount,setAmount] = useState(0);
    const dispatch = useDispatch();
    
    const handleDelete=(Product)=>{
        console.log("delete ",Product);
        dispatch(deleteQty(Product))
    }
    const handleAdd=(Product)=>{
        console.log("delete ",Product);
        dispatch(addQty(Product))
    }
    useEffect(()=>{
        console.log("hello cart useffect");
        let temp = 0;
        for(var i = 0;i<arr.length;i++){
            temp = temp + arr[i].qty*arr[i].price;
        }
        setAmount(temp.toFixed(2));
    },[arr])
    
    return(
        <div>
        {isLoggedIn?
        <div style={{'overflow-x':'hidden'}}>
            <h1 id="e1" className="text-primary d-flex justify-content-center m-4" > {name}'s Cart</h1>
            <table className="m-4 table">
                <thead className="table-warning">
                    <tr>
                    <th style={{'width':'5vw'}} scope="col">S no.</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col" >Total Amount</th>
                    </tr>
                </thead>
                {arr.map((item,index)=>(
                    // <div>
                    <tbody >
                        <tr >
                        <th style={{'backgroundColor':'rgb(226, 207, 244)'}}  className="border border-light dHover" scope="row">{index + 1}</th>
                        <td  style={{'backgroundColor':'rgb(226, 207, 244)'}}  className="border border-light dHover" >{item.name}</td>
                        <td  style={{'backgroundColor':'rgb(226, 207, 244)'}}  className="border border-light dHover" >{item.price}</td>
                        <td style={{'backgroundColor':'rgb(226, 207, 244)'}}  className="border border-light dHover">{item.qty}</td>
                        <td style={{'backgroundColor':'rgb(226, 207, 244)'}}  className="border border-light dHover">{(item.price*item.qty).toFixed(2)}</td>
                        <button style={{'margin-left':'-15px','margin-bottom':'4px'}} className="c-add btn bg-primary text-light" onClick={()=>handleAdd(item)}>Add item</button>
                        <button  style={{'margin-left':'5px','margin-bottom':'4px'}}  className="c-delete btn bg-danger text-light" onClick={()=>handleDelete(item)}>Delete item</button>
                        </tr>
                        {/* <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        </tr> */}
                    </tbody>
                    // </div>
                ))}
                
                </table>
                <div className="fs-2 text-dark d-flex justify-content-center align-items-center">Final Amount:<span className="m-2 fs-1 d-flex align-items-center text-success"> {amount} </span> </div>
                            {/* <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5 p-4 mx-3 justify-content-evenly ">
            {
            arr.map((item)=>(
            <div class="col">
            <div className="card bg-light  p-1" id="cm1">
               
                <div  className="card-body">
                
                <h5 className="card-productName">{item.name}</h5>
                  <h6 className="card-productName">{item.description}</h6>
                  <p className="card-text">{item.category}</p>
                  <p className="card-text">{item.price} $</p>
                  <p className="card-text">Qty: {item.qty}</p>
                   <button onClick={()=>handleDelete(item)}>Delete item</button>
                
                </div>
            </div>
            </div>
            ))}
            </div> */}

        </div>
        :<div><h1>Please Login to Continue</h1></div>
    }
    </div>
    )
}
export default Cart;
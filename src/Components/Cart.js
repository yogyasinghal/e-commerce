import React from "react";
import './Products';
import { useDispatch } from "react-redux";
// import {remove} from '../store/cartSlice';
import { useSelector } from 'react-redux';
import {deleteQty} from '../store/dataSlice';

function Cart(){
   
    // const arr = useSelector((state)=>state.cart);
    let arr = useSelector((state)=>state.data).data;
    arr = arr.filter(item=>item.qty>0);
    const user = useSelector((state)=>state.login);
    const isLoggedIn = user.status;
    const name = user.name;
   
    
    const dispatch = useDispatch();
    
    const handleDelete=(Product)=>{
        console.log("delete ",Product);
        dispatch(deleteQty(Product))
    }
    
    return(
        <div>
        {isLoggedIn?
        <div>
            <h1 id="e1" className="text-primary d-flex justify-content-center m-4" > {name}'s Cart</h1>
           
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5 p-4 mx-3 justify-content-evenly ">
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
            </div>

        </div>
        :<div><h1>Please Login to Continue</h1></div>
    }
    </div>
    )
}
export default Cart;
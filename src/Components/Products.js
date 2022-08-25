import React, { useState} from "react";
import './MovieList.css'
// import data from "../Data/data";
import { useDispatch,useSelector  } from "react-redux";
// import {add,remove} from '../store/cartSlice';

import {addMovie,removeMovie,setMovie,addQty,deleteQty} from '../store/dataSlice';

import {useNavigate} from 'react-router-dom'

function MovieList(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.login);
    const isLoggedIn = user.status;
    const admin = user.admin;
    // const name = user.name;
    let arr = useSelector((state)=>state.data).data;
    console.log("arr movielist",arr);

    // useEffect(()=>{
    //     const sorteddata=[...arr]
    //     .sort((a,b)=>Number(a.price)-Number(b.price))
    //     dispatch(setMovie(sorteddata))
    // },[])

    // console.log("arr",arr);
    const [productName,setProductName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    
    const [category,setCategory] = useState('');
   
    const SortName=(e)=>{
        e.preventDefault();
        console.log("sort name");
        const sorteddata=[...arr]
        .sort((a,b)=>a.name.localeCompare(b.name))
       
        dispatch(setMovie(sorteddata))
       
    
    }
    const sortDescription=(e)=>{
        e.preventDefault();
        
        const sorteddata=[...arr]
        .sort((a,b)=>a.description.localeCompare(b.description))
        
        dispatch(setMovie(sorteddata))
       
    
    }
   
    const handleAdd = (Product)=>{
        if(!isLoggedIn){
            console.log("isLoggedin movielist",isLoggedIn);
            navigate('/login');
        }
        
       
        dispatch(addQty(Product))
        // dispatch(add(Product))
    }
    const handleMinus = (Product)=>{
        if(!isLoggedIn){
            console.log("isLoggedin movielist",isLoggedIn);
            navigate('/login');
        }
        // dispatch(remove(Product))
        dispatch(deleteQty(Product))
    }
    const handleDelete = (Movie)=>{
        dispatch(removeMovie(Movie))
    }
    const addItem = ()=>{
        let temp = {
            id:Date.now(),
            name:productName,
            description:description,
            category:category,
            price:price,
            qty:0
        }
        dispatch(addMovie(temp))
       
        // setUpdateUi('a');
       
    }
    
    return(
        
        <div>

             {
             admin?
             <div>
            <h1 className="text-primary d-flex justify-content-center m-4">Add Product</h1>
            <form className="row mx-4 d-flex justify-content-center align-items-center">
                <div className="col-sm-6 col-md-3  form-group p-2">
                    <input onChange={(e)=>setProductName(e.target.value)} type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Enter productName"></input>
                </div>
                <div className="col-sm-6 col-md-3  form-group p-2">
                    <input onChange={(e)=>setDescription(e.target.value)} type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Enter Director"></input>
                </div>
                <div className="col-sm-6 col-md-3  form-group p-2">
                    <input onChange={(e)=>setPrice(e.target.value)} type="number" className="form-control"  placeholder="Enter price"></input>
                </div>
                <div className="col-sm-6 col-md-3  form-group p-2">
                    <input onChange={(e)=>setCategory(e.target.value)} type="text" className="form-control"  placeholder="Enter category"></input>
                </div>
                
               
            </form>
            <button
                onClick={(e)=>addItem(e)}
                type="submit" className="btn btn-primary m-2">Submit</button>    
           
             </div>:<div></div>}

            <h1 id="e1" className="text-primary d-flex justify-content-center m-4" >Product List</h1>
            <form className="d-flex justify-content-center g-2 align-items-center">
                    <div className="form-group mx-5">
                      
                    </div>
                    <div className="d-flex">
                    <h4 className="m-2"> Sort By: </h4>
                   
                    <button className="btn btn-primary m-2" onClick={(e)=>SortName(e)}>Name </button>
                     <button className="btn btn-primary m-2" onClick={(e)=>sortDescription(e)}>Description</button>
                    
                     </div>
                    
                  
                </form>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5 p-4 mx-3 justify-content-evenly ">
            {
            arr.map((item)=>(
            <div className="col">
            <div className="card bg-light  p-1" id="cm1">
               
                <div className="card-body">
                  <h5 className="card-productName">{item.name}</h5>
                  <h6 className="card-productName">{item.description}</h6>
                  <p className="card-text">{item.category}</p>
                  <p className="card-text">{item.price} $</p>
                    <button onClick={()=>handleAdd(item)} className="m-2 btn btn-primary" >Add to Cart</button>
                    {item.qty}
                    <button onClick={()=>handleMinus(item)} className="m-2 btn btn-primary" >Delete from Cart</button>
                    {admin?
                    <button onClick={()=>handleDelete(item)} className="m-2 btn btn-primary" >Delete Movie</button>
                    :<div></div>}
                </div>
            </div>
            </div>
            ))}
            </div>

        </div>
       
    )
}
export default MovieList;
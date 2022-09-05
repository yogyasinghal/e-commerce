import React, { useState,useEffect} from "react";
import './Products.css'

// import data from "../Data/data";
import { useDispatch,useSelector  } from "react-redux";
// import {add,remove} from '../store/cartSlice';

import {addMovie,removeMovie,setMovie,addQty,deleteQty} from '../store/dataSlice';

import {useNavigate} from 'react-router-dom';

function MovieList(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.login);
    const isLoggedIn = user.status;
    const admin = user.admin;
    // const name = user.name;
    let globalArray = useSelector((state)=>state.data).data;
    const [arr,setArray] = useState(globalArray);
    // let arr = globalArray;
    console.log("arr movielist",arr);
    // let arr2 = arr.filter(item=>item.category==='accessories');
    // let arr3 = arr.filter(item=>item.category);
    const arr3 = [...new Set(globalArray.map(item => item.category))];
    // console.log(arr2);
    arr3.push('reset')
    const [updateUi,setUpdateUi] = useState();
    console.log(arr3);

    useEffect(()=>{
        console.log("use effect products");
        setArray(globalArray);
        console.log(updateUi);
        // const sorteddata=[...arr]
        // .sort((a,b)=>Number(a.price)-Number(b.price))
        // dispatch(setMovie(sorteddata))
    },[updateUi])

    // console.log("arr",arr);
    const [productName,setProductName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [filterValue,setFilterValue] = useState('');
    const [category,setCategory] = useState('');
   
   

    const SortName=(e)=>{
        e.preventDefault();
        console.log("sort name");
        const sorteddata=[...arr]
        .sort((a,b)=>a.name.localeCompare(b.name))
        setArray(sorteddata)
       
        dispatch(setMovie(sorteddata))
       
    
    }
    const handleChange=(e)=>{
      e.preventDefault();
      console.log(e.target.value);
      let tempdata = arr.filter(
          (item)=>item.name.toLowerCase().match(e.target.value.toLowerCase())
      )
      setArray(tempdata);
      // return();

  }
    const sortDescription=(e)=>{
        e.preventDefault();
        
        const sorteddata=[...arr]
        .sort((a,b)=>a.description.localeCompare(b.description))
        setArray(sorteddata)
        dispatch(setMovie(sorteddata))
       
    
    }
   
    const handleAdd = (Product)=>{
        if(!isLoggedIn){
            console.log("isLoggedin movielist",isLoggedIn);
            navigate('/login');
        }
        
        
        dispatch(addQty(Product))
        // setArray(arr)
        setUpdateUi(Date.now())
        // dispatch(add(Product))
    }
    const handleMinus = (Product)=>{
        if(!isLoggedIn){
            console.log("isLoggedin movielist",isLoggedIn);
            navigate('/login');
        }
        // dispatch(remove(Product))
        dispatch(deleteQty(Product))
        setUpdateUi(Date.now())
    }
    const handleDelete = (Movie)=>{
        dispatch(removeMovie(Movie))
        setUpdateUi(Date.now())
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
        // setArray(...arr,temp);
        setArray(arr=>[temp,...arr]);
        // setUpdateUi('a');
       
    }

    const handleFilter=(value)=>{
        if(value.item==="reset"){
            setArray(globalArray);
            setFilterValue('');
        }
        else{
            console.log("item from filter",value);
            setFilterValue(value.item);
            let filterArr = globalArray.filter(item=>item.category===value.item);
            console.log("Arr filter",filterArr);
            setArray(filterArr)
            console.log(arr);
        }
        // dispatch(setMovie(filterArr))
    }
    
    return(
        
        <div>
          {/* <div className="bg-dark w-50 p-2">
          <NavBar2 handleChange={handleChange}></NavBar2>
          </div> */}
                   {/* <div className="form-group ">
                <input type="text" onChange={(e)=>handleChange(e)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Author name"></input>
            </div> */}

             {
             admin?
             <div>
            <h1 className="text-primary d-flex justify-content-center m-4">Add Product</h1>
            <form className="row mx-4 d-flex justify-content-center align-items-center">
                <div className="col-sm-6 col-md-3  form-group p-2">
                    <input onChange={(e)=>setProductName(e.target.value)} type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Enter productName"></input>
                </div>
                <div className="col-sm-6 col-md-3  form-group p-2">
                    <input onChange={(e)=>setDescription(e.target.value)} type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Enter Description"></input>
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









             {/* <div className="col">
        <div className="outer bg-info card border border-info border-4">
         
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade "
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://cdn.pixabay.com/photo/2020/09/19/19/37/landscape-5585247_1280.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_1280.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
     

         
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content.
            </p>
          </div>
          <div className="button-align">
            <button type="button" className="btn btn-primary">Buy</button>
            20
            <button type="button" className="btn btn-danger">Sell</button>
          </div>
        </div>
      </div> */}
















           
            
            <h1 id="e1" className="text-primary m-auto " >Product List</h1>
           
            {/* <button className="btn btn-secondary"  data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover">
            Popover on bottom
            </button> */}

            {/* <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Button with data-bs-target
            </button>
            <div class="collapse" id="collapseExample">
                <div class="card card-body">
                    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </div>
            </div> */}





            <div style={{height:'8vh'}} className="d-flex justify-content-between">
            <div className="w-50 d-flex align-items-center">
                <input  type="text" onChange={(e)=>handleChange(e)} style={{'margin-left':'65px'}} className="d-flex w-50 form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Name"></input>
            </div>
            <div style={{'margin-right':'85px'}} className="d-flex align-items-center justify-content-end">
            {/* filter */}
     

        <div className="btn-group align-items-center">
            <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Filter {filterValue}
            </button>
            <ul className="filter dropdown-menu">
                {/* <li><a className="dropdown-item" href="#">Action</a></li> */}
                {/* <li><a className="dropdown-item" href="#">Another action</a></li> */}
                {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                {arr3.map((item,index)=>(
                    <div className="filter_element">
                         {item==='reset'?
                    <li><hr className="dropdown-divider"></hr></li>:<div></div>}
                    <button onClick={()=>handleFilter({item})} className="btn w-100 d-flex justify-content-center">{item}</button>
                   
                    </div>
                    ))}
            
            </ul>
        </div>



                    <div className="d-flex align-items-center">
                    <h4 className="m-2"> Sort By: </h4>
                   
                    <button className="my-4 btn btn-primary m-2" onClick={(e)=>SortName(e)}>Name </button>
                     <button className="my-4 btn btn-primary m-2" onClick={(e)=>sortDescription(e)}>Description</button>
                    
                     </div>
                    
                  
                {/* </form> */}
                </div>

                </div>


            
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5 p-4 mx-3 justify-content-evenly ">
            {
            arr.map((item)=>(
                <div className="col">
        <div className="outer card border border-info border-4">
         
          <div
            id={item.id}
            className="carousel slide carousel-fade "
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://cdn.pixabay.com/photo/2020/09/19/19/37/landscape-5585247_1280.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_1280.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={"#"+item.id}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={"#"+item.id}
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
     

         
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            
            <button className="btn btn-dark-outline" type="button" data-bs-toggle="collapse" data-bs-target={"#"+item.id+'desc'} aria-expanded="false" aria-controls="collapseExample">
            Show Description
            </button>
            <div className="collapse" id={item.id+'desc'}>
                <p  className="card-text m-0">
                   {item.description}
                </p>
            </div>
            {/* <p className="card-text m-0">
             {item.description}
            </p> */}
            
            <p className="card-text m-1">{item.category}</p>
            <p className="card-text m-0 text-success">{item.price} $</p>
          </div>
          <div className="button-align">
          <button onClick={()=>handleAdd(item)} className="m-2 btn btn-primary" >Add to Cart</button>
                     {item.qty}
                     <button onClick={()=>handleMinus(item)} className="m-2 btn btn-primary" >Delete from Cart</button>
                     {admin?
                    <button onClick={()=>handleDelete(item)} className="m-2 btn btn-primary" >Delete Movie</button>
                    :<div></div>}
          </div>
        </div>
      </div>

            // <div className="col">
            // <div className="card bg-light  p-1" id="cm1">
            //     <div className="card-body">
            //       <h5 className="card-productName">{item.name}</h5>
            //       <h6 className="card-productName">{item.description}</h6>
            //       <p className="card-text">{item.category}</p>
            //       <p className="card-text">{item.price} $</p>
            //         <button onClick={()=>handleAdd(item)} className="m-2 btn btn-primary" >Add to Cart</button>
            //         {item.qty}
            //         <button onClick={()=>handleMinus(item)} className="m-2 btn btn-primary" >Delete from Cart</button>
            //         {admin?
            //         <button onClick={()=>handleDelete(item)} className="m-2 btn btn-primary" >Delete Movie</button>
            //         :<div></div>}
            //     </div>
            // </div>
            // </div>
            ))}
            </div>

        </div>
       
    )
}

export default MovieList;
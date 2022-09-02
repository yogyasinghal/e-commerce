import React  from 'react';
import {NavLink} from 'react-router-dom'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {emptyCart} from './store/cartSlice';
import {logout} from './store/userSlice';

const NavBar2=()=>{
    // const items = useSelector((state)=>state.cart);
    let items = useSelector((state)=>state.data).total;
    const user = useSelector((state)=>state.login);
    const isLoggedIn = user.status;
    const dispatch = useDispatch();
    const [toggle,setToggle] = useState(false);
    const handleLogout=()=>{
        dispatch(emptyCart())
        dispatch(logout())
    }
    return(
        <>
        
    <nav 
        className="navbar navbar-expand-lg navbar-light bg-success"
        style = {{padding:"2px"}}
    >
    {/* <a className="navbar-brand" href="#">Navbar</a> */}
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" 
    id="navbarSupportedContent"
    style={{
        backgroundColor:"aquamarine",
        width: "100%",
        justifyContent: "space-between"

    }}
      >
        <ul className="navbar-nav mr-auto">
        {/* <li className="nav-item active">
        <NavLink to='/'>
        {
            ({isActive})=>(
                <button className={isActive?'btn btn-none border-0 text-primary':'btn btn-none border-0'}>Home</button>
            )
        }
      </NavLink>
           
        </li> */}
       {!isLoggedIn?
        <li className="nav-item">
        <NavLink to='/login'>
        {
            ({isActive})=>(
                <button className={isActive?'btn btn-none border-0 text-primary':'btn btn-none border-0'}>Login</button>
            )
        }
      </NavLink>
      </li>
      :
    <li className="nav-item">
        <button onClick={handleLogout} className='btn btn-none border-0'>Logout</button>
    </li>
        }
      {/* <li>
      <NavLink to='/cart'>
        {
            ({isActive})=>(
                <button className={isActive?'btn btn-none border-0 text-primary':'btn btn-none border-0'}>Cart {items}</button>
            )
        }
      </NavLink>
           
        </li> */}
        <li className="nav-item">
        


<NavLink to='/movies'>
      {
        ({isActive})=>(
          <div> 
          <button className={isActive?'btn btn-none text-primary border-0':'btn btn-none border-0'}>Products</button>
          {isActive?setToggle(true):setToggle(false)}
          </div>
          
        )
      }
      </NavLink>

{/* {toggle?<div>toggle true</div>:<div>toggle false</div>} */}

       
        </li>
        
        </ul>
        <form className="form-inline my-2 my-lg-0"
        style={{
            display: "flex",
            width: "40%",
            marginRight: "1%"
        }}
        >
       
        </form>
        {toggle?<div>toggle true</div>:<div>toggle false</div>}
    </div>
    
    </nav>
        </>
    )
}
export default NavBar2;
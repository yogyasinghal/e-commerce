
import './App.css';
import {Route,Routes} from 'react-router-dom';

import Login from './Validations/Login';

import Home from './Home';
import Cart from './Components/Cart';
import Shopping from './Components/Products';
import NavBar from './Navbar';
import NavBar2 from './Navbar2';
import { Provider } from 'react-redux';
import store from './store/store';


// import {fetchUser} from './store/dataSlice';
// store.dispatch(fetchUser())

function App() {
  return (
    <div className="App">
     <Provider store={store}>
      {/* <div className='d-flex col'> */}
      <NavBar></NavBar>
      {/* <NavBar2></NavBar2> */}
      {/* </div> */}
      <Routes>
      <Route path="/" element={<Home></Home>}></Route>
     
      <Route path ='/login' element = {<Login></Login>}></Route>
     
      <Route path ='/movies' element = {<Shopping></Shopping>}></Route>
      <Route path = '/cart' element={<Cart></Cart>}></Route>
      </Routes>

     </Provider>
    </div>
  );
}

export default App;

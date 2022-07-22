import {Provider} from 'react-redux'
import store from './store';
import Navbar from './component/navbar';
import Home from './component/home';
import Loginform from './component/loginform';
import Registerform from './component/registerform';
import Ticketpage from './component/ticketpage'
import Singleticketview from './component/singleticketview'
import Createticketform from './component/createticketform';
import {ToastContainer} from 'react-toastify'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

import Privateroute from './component/privateroute';

function App() {
  return (

  <Provider store={store}>
    <Router>
    <div className='w-screen min-h-screen bg-zinc-300'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Loginform/>}></Route>
        <Route path='/register' element={<Registerform/>}></Route>
        <Route path='/ticketpage' element={<Privateroute/>}>
          <Route path='/ticketpage' element={<Ticketpage/>}></Route>
        </Route>
        <Route path='/createticketform' element={<Privateroute/>}>
          <Route path='/createticketform' element={<Createticketform/>}></Route>
        </Route>
        <Route path='/singleticketview/:ticketid' element={<Privateroute/>}>
          <Route path='/singleticketview/:ticketid' element={<Singleticketview/>}></Route>
        </Route>

      </Routes>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
    </div>
    </Router>
  </Provider>
  );
}

export default App;

import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios';
import {BASE_URL} from '../utils/constants';
import { useDispatch , useSelector} from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useEffect } from 'react';
import {Outlet , useNavigate} from 'react-router-dom';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async() =>{
    if(userData) return
    try {
      const res = await axios.get(BASE_URL + "/profile/view",{
        withCredentials:true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if(error.status === 401){
        navigate("/login")
      }

    }
  }
  useEffect(() =>{
    fetchUser();
  },[]);

  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Body

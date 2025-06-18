import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios';
import {BASE_URL} from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useEffect } from 'react';

const Body = () => {
  const dispatch = useDispatch();

  const fetchUser = async() =>{
    try {
      const res = await axios.get(BASE_URL + "/profile/view",{
        withCredentials:true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      console.log(error);
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

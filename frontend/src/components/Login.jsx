import  { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../utils/constants.js";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await axios.post(
      BASE_URL + "/login",
      { emailId, password },
      { withCredentials: true }
    );
    dispatch(addUser(res.data));
    return navigate("/feed");
    console.log("Login Success", res.data);
  } catch (error) {
    console.error("Login Error", error);
  }
};

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm m-16">
        <div className="card-body px-10">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="input">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
              <input 
              type="search" 
              value={emailId} 
              className="grow" 
              onChange={(e)=>setEmailId(e.target.value)}
              placeholder="E-mail" />
            </label>

            <label className="input mt-4">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              </g>
              <input 
              type="text"
              value={password}
              className="grow" 
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password" />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

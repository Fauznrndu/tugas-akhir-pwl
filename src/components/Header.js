import React, { useEffect } from 'react';
import "./styles/Header.css"
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import userImg from "../assets/user.svg";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {//pengkondisian dimana user terautentikasi apa tidak
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logout(){
    try{
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logged Out Successfully!");
        navigate("/")
      }).catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
    }catch(e){
      toast.error(e.message);
    }
  }
  return (
    <div className='navbar'>
      <p className='logo' style={{ fontSize:"1.5rem" }}>Uangku</p>
      {user && (
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem"}}>
          <img src={user.photoURL ? user.photoURL : userImg} style={{ borderRadius:"50%", height:"1.5rem", width:"1.5rem", backgroundColor:"black" }}/>
          <p className='logo link' onClick={logout}>Logout</p>
        </div>)}
    </div>
  );
}

export default Header;

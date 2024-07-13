import React, { useState } from 'react';
import "./styles/SignupSignin.css"
import Input from './Input';
import Button from './Button';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword}  from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth, db, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const SignupSignin = () => {
  //menginisialisasi state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  //function untuk signup email dan password
  function signupWithEmail(){
    setLoading(true);
    // console.log("Name", name);
    // console.log("Email", email);
    // console.log("Password", password);
    // console.log("Confirm Password", confirmPassword);
    if (name!="" && email!="" && password!="" && confirmPassword!="") {//autentikasi pengguna, atau membuat akun baru menggunakan email dan password
      if (password==confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          // console.log("User=>", user);
          toast.success("User Created!");
          setLoading(false);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          createDoc(user);// membuat dokumen dengan id pengguna mengikuti id
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
      }else{
        toast.error("Password and Confirm password don't match");
        setLoading(false);
      }
    }else{
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  //fungsi login menggunakan email dan password
  function loginUsingEmail(){
    setLoading(true);
    // console.log("Email", email)
    // console.log("Password", password)
    if (email!="" && password!="") {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("User Logged In!");
        // console.log("User Logged In", user);
        setLoading(false);
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
    }else{
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  function googleAuth(){ //fungsi untuk autentikasi menggunakan google
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
      .then((result) => { //memberikan akses token, bisa digunakan  untuk mengakses api google
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // console.log("User=>",user);
        createDoc(user);
        setLoading(false);
        navigate("/dashboard");
        toast.success("User authenticated!");

      }).catch((error) => { 
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
    }catch(e){
      setLoading(false);
      toast.error(e.message);
    }
  }

  //pastikan dokumen beserta uid tidak ada sebelumnya
  //fungsi membuat dokumen
  async function createDoc(user){
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()){
      try{
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc Created!");
      }catch(e){
        toast.error(e.message);
        setLoading(false);
      }
    }else{
      // toast.error("Doc already exists");
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ?  
      <div className='signup-wrapper'> 
        <h2 className='title'>
          Login on <span style={{ color:"" }}>Uangku</span>
        </h2>
        <form>
          <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"example@gmail.com"}/>
          <Input type="password" label={"Password"} state={password} setState={setPassword}  placeholder={"example123"}/>
          <Button disabled={loading} text={loading ? "Loading..." : "Login Using Email and Password"} onClick={loginUsingEmail} />
          <p className='p-login'>or</p>
          <Button  text={loading ? "Loading..." : "Login Using Google"} dark={true} onClick={googleAuth}/>
          <p className='p-login' style={{ cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Don't Have An Account ? Click Here</p>
        </form>
      </div>
        : 
      <div className='signup-wrapper'> 
      <h2 className='title'>
        Sign Up on <span style={{ color:"" }}>Uangku</span>
      </h2>
      <form>
        <Input label={"Full Name"} state={name} setState={setName} placeholder={"example"}/>
        <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"example@gmail.com"}/>
        <Input type="password" label={"Password"} state={password} setState={setPassword}  placeholder={"example123"}/>
        <Input type="password" label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"example123"}/>
        <Button disabled={loading} text={loading ? "Loading..." : "Signup Using Email and Password"} onClick={signupWithEmail} />
        <p className='p-login'>or</p>
        <Button text={loading ? "Loading..." : "Signup Using Google"} dark={true} onClick={googleAuth}/>
        <p className='p-login' style={{ cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Have An Account Already ? Click Here</p>
      </form>
      </div>}
    </>
  );
}
export default SignupSignin;
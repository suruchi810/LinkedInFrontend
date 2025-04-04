import UserLayout from '@/layout/UserLayout'
import React from 'react'
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '@/config/redux/action/authAction';
import { emptyMessage } from '@/config/redux/reducer/authReducer';

const LoginLayout = () => {

  const authState = useSelector((state) => state.auth);

  const router = useRouter();

  const dispatch = useDispatch();

  const [userLoginMethod, setUserLoginMethod] = useState(false);

  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username , setUsername] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (authState.loggedIn) {
      router.push('/dashboard')
    }
  },[authState.loggedIn]);

  const handleRegister = () => {
    dispatch(registerUser({username, password, email, name}));
  }

  useEffect(()=>{
    dispatch(emptyMessage());
  }, [userLoginMethod])

  useEffect(()=>{
    if(localStorage.getItem("token")){
      router.push('/dashboard');
    }
  },[])

  const handleLogin = () => {
    dispatch(loginUser({email, password}));
  }

  return (
    <UserLayout>

      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer_left}>
            <p className={styles.cardLeft_heading}> {userLoginMethod ? "Sign In" : "Sign Up"}</p>
            <p style={{color:authState.isError?"red":"green"}}>{authState.message.message}</p>
            <div className={styles.inputContainers}>
              <div className={styles.rows}>
                {!userLoginMethod && <div>
                <input style={{marginBottom:"1.2rem"}} onChange={(e)=>setUsername(e.target.value)} className={styles.inputField} type="text" placeholder='Username' />
                
                <input onChange={(e)=>setName(e.target.value)} className={styles.inputField} type="text" placeholder='Name' />

                </div>}
                <input onChange={(e)=>setEmailAddress(e.target.value)} className={styles.inputField} type="text" placeholder='Email' />

                <input onChange={(e)=>setPassword(e.target.value)} className={styles.inputField} type="text" placeholder='Password' />

                <div onClick={() => {
                  if(userLoginMethod){
                    handleLogin();
                  }else{
                    handleRegister();
                  }
                }} className={styles.button}>
                  <p>{!userLoginMethod?"Sign Up":"Sign In"}</p>
                </div>

              </div>
            </div>
          </div>
          <div className={styles.cardContainer_right}>
            <div>
              {userLoginMethod?<p>Don't have an account</p>:<p>Already have an account</p>}
            
            <div style={{backgroundColor:"white", color:"black"}} onClick={() => {
                  setUserLoginMethod(!userLoginMethod);
                }} className={styles.button}>
                  <p>{userLoginMethod?"Sign Up":"Sign In"}</p>
                </div>
          </div>
          </div>
        </div>
        </div>
    </UserLayout>
  )
}

export default LoginLayout
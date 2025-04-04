import React from 'react'
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '@/config/redux/reducer/authReducer';
const Navbar = () => {
    const router = useRouter()

    const dispatch = useDispatch()

    const authState = useSelector((state) => state.auth)

  return (
    <div className={styles.container}>
        <div className={styles.navBar}>
            <h2 style={{cursor:"pointer"}} onClick={()=>{
              router.push("/")

            }}>Pro connect</h2>

            <div className={styles.navBarOptionsConainer}>

            {authState.profileFetched && <di>
              
              <div style={{display:"flex", gap:"1.2rem"}}>
                <p>{authState.user.userId.name}</p>
                <p onClick={()=>{
                  router.push("/profile");
                }}style={{fontWeight:"bold", cursor:"pointer"}}>Profile</p>
                <p onClick={()=>{
                  localStorage.removeItem("token")
                  router.push("/login")
                  dispatch(reset())
                }}
                style={{fontWeight:"bold", cursor:"pointer"}}>Logout</p>
              </div>

            </di>}

              {!authState.profileFetched && <div><div onClick={()=>{
              router.push("/login")
            }} className={styles.buttonJoin}>
              <p>Be a part</p>
            </div></div>}
            
            </div>
        </div>
    </div>
  )
}

export default Navbar
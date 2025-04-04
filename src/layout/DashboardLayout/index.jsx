import React, { useEffect } from 'react'
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { setTokenIsThere } from '@/config/redux/reducer/authReducer';
import { useSelector } from'react-redux';
import { useDispatch } from 'react-redux';
const DashboardLayout = ({ children }) => {

    const router = useRouter();

    const authState = useSelector((state) => state.auth) 

    const dispatch = useDispatch();

    useEffect(()=>{
        if(localStorage.getItem('token')===null){
            router.push("/login")
        }
        dispatch(setTokenIsThere());
    })

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.homeContainer}>
                    <div className={styles.homeContainer_left}>

                        <div onClick={() => {
                            router.push('/dashboard')
                        }}
                            className={styles.sidebarOption}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <p>Scroll</p>
                        </div>

                        <div onClick={() => {
                            router.push('/discover')
                        }} className={styles.sidebarOption}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <p>Discover</p>
                        </div>

                        <div onClick={() => {
                            router.push('/my_connections');
                        }} className={styles.sidebarOption}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <p>My Connections</p>
                        </div>



                    </div>

                    <div className={styles.feedContainer}>
                        {children}
                    </div>

                    <div className={styles.extraContainer}>
                        <h2 className={styles.heading}>Top profiles</h2>
                        {authState.all_profile_fetched && authState.all_users.map((profile)=>{
                            return (
                                <div key={profile._id} className={styles.extraContainer_profile}>
                                        <p>{profile.userId?.name}</p>
                                </div>
                            )
                        })}
                    </div>

                </div>


            </div>
        </div>
    )
}

export default DashboardLayout
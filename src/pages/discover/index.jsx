import React, { useEffect } from 'react'
import UserLayout from '@/layout/UserLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '@/config/redux/action/authAction'
import { useSelector } from 'react-redux'
import styles from './styles.module.css';
import { BASE_URL } from '@/config';
import { useRouter } from 'next/router'
const Discover = () => {

  const router = useRouter();

  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!authState.all_profile_fetched) {
      dispatch(getAllUsers());
    }
  }, [])

  return (
    <UserLayout>
      <DashboardLayout>
        <div>
          <h1>Discover</h1>
          <div className={styles.allUserProfile}>
            {authState.all_profile_fetched && authState.all_users && authState.all_users
            .filter(user => user.userId && user.userId.username && user.userId.profilePicture && user.userId.name && user.userId.email)
            .map((user) => {
              return (
                <div onClick={()=>{
                  router.push(`/view_profile/${user.userId?.username}`)
                  }} key={user._id} className={styles.userCard}>
                  <img src={`${BASE_URL}/${user.userId?.profilePicture}`} alt="User Profile" className={styles.profile_pic}/>
                  <div>
                    <h2>{user.userId?.name}</h2>
                    <p>{user.userId?.email}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
  
}

export default Discover
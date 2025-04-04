import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import DashboardLayout from '@/layout/DashboardLayout'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styles from './index.module.css'
import { getAboutUser } from '@/config/redux/action/authAction'
import { BASE_URL, clientServer } from '@/config'
import { useState } from 'react'
import { getAllPosts } from '@/config/redux/action/postAction'
const profilePage = () => {

  const dispatch = useDispatch()

  const postState = useSelector((state) => state.posts);
  const authState = useSelector((state) => state.auth);

  const [userProfile, setUserProfile] = useState({})

  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    dispatch(getAboutUser({token: localStorage.getItem('token')}))
    dispatch(getAllPosts())
  },[])  

  useEffect(()=>{
    if(authState.user!=undefined){
        setUserProfile(authState.user)
        let post = postState.posts.filter((post) => {
            return post.userId.username === authState.user.userId.username;
        })
        setUserPosts(post);
    }
  }, [authState.user, postState.posts])

  const updateProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    formData.append("token", localStorage.getItem("token"));
    await clientServer.post(`/upload_profile_picture`, formData, {
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    });
    dispatch(getAboutUser({token: localStorage.getItem("token")}))
  }

  const updateProfileData = async () => {
    const request = await clientServer.post("/user_update", {
      token: localStorage.getItem("token"),
      name: userProfile.userId.name,
    });
    await clientServer.post("/updateProfileData", {
      token: localStorage.getItem("token"),
      bio: userProfile.userId.bio,
      currentPost: userProfile.currentPost,
      postWork: userProfile.postWork,
      education: userProfile.education,
    });

    dispatch(getAboutUser({token: localStorage.getItem("token")}));
  }

  return (
    <UserLayout>
        <DashboardLayout>
        {authState.user && userProfile.userId && 
        <div className={styles.container}>
            <div className={styles.backDropContainer}>
                <img className={styles.backDrop} src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt={userProfile.name} />
                <label htmlFor='profilePictureUpload' className={styles.backdrop_overlay}><p>Edit</p></label>
                <input onChange={(e)=>{
                  updateProfilePicture(e.target.files[0])
                }} type="file" id='profilePictureUpload' hidden />
            </div>
            <div className={styles.profileContainer_details}>
              <div style={{ display: "flex", gap: "0.7rem" }}>
                <div style={{ flex: "0.8" }}>
                  <div style={{ display: "flex", width: "fit-content", alignItems: "center" }}>
                    <h2 style={{ marginRight: "10px" }}><input className={styles.nameEdit} type='text' value={userProfile.userId.name} onChange={(e)=>{
                      setUserProfile({...userProfile, userId: {...userProfile.userId, name: e.target.value}})
                    }}/></h2>
                    <p style={{ color: "grey" }}>@{userProfile.userId.username}</p>
                  </div>

                <div>
                  <textarea value={userProfile.bio} onChange={(e)=>{
                    setUserProfile({...userProfile, bio: e.target.value})
                  }} rows={Math.max(3, Math.ceil(userProfile.bio.length/80))} style={{width: "100%"}}/>
                </div>
                
                </div >

                <div style={{ flex: "0.2" }}>
                  <h3>Recent Activity</h3>
                  {userPosts.map((post) => {
                    return (
                      <div key={post.id} className={styles.postCard}>
                        <div className={styles.card}>
                          <div className={styles.card_profileContainer}>
                            {post.media !== "" ? <img src={`${BASE_URL}/${post.media}`} /> : <div style={{ width: "3.4rem", height: "3.4rem" }}></div>}
                          </div>

                          <p>{post.body}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className={styles.workHistory}>
              <h4>Work History</h4>
              <div className={styles.workHistoryContainer}>
                {

                  userProfile.postWork.map((work, index) => {
                    return (
                      <div key={index} className={styles.workHistoryCard}>
                        <div className={styles.card}>
                          <h5>{work.company}</h5>
                          <p>{work.year}</p>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>

                {userProfile != authState.user && <div onClick={()=>{
                  updateProfileData()
                }} className={styles.coonctionButton}>
                  update Profile</div>
                }
          </div>
        }
        </DashboardLayout>
    </UserLayout>
  )
}

export default profilePage
import React, { useEffect } from 'react'
import { clientServer } from "@/config";
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { BASE_URL } from '@/config';
import { useState } from 'react';
import { getAllPosts } from '@/config/redux/action/postAction';
import { useSelector, useDispatch } from 'react-redux';
import { getConnectionRequest, getMyConnectionRequest, sendConnectionRequest } from '@/config/redux/action/authAction';

const ViewProfilePage = ({ userProfile }) => {

  const router = useRouter();
  const postState = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  const [isCurrentUserInConnection, setIsCurrentUserInConnection] = useState(false);
  const [isConnectionNull, setIsConnectionNull] = useState(true);

  useEffect(() => {
    getUserPost();
  }, []);

  const getUserPost = async () => {
    await dispatch(getAllPosts());
    await dispatch(getConnectionRequest({ token: localStorage.getItem('token') }));
    await dispatch(getMyConnectionRequest({ token: localStorage.getItem('token') }));
  }

  useEffect(() => {
    let post = postState.posts.filter((post) => {
      return post.userId.username === router.query.username;
    })
    setUserPosts(post);
  }, [postState.posts]);

  useEffect(() => {
    if (authState.connections.some(user => user?.connectionId?._id === userProfile.userId._id)) {
      setIsCurrentUserInConnection(true);
      if (authState.connections.find(user => user?.connectionId?._id === userProfile.userId._id).status_accepted === true) {
        setIsConnectionNull(false);
      }
    }

    if (authState.connectionRequest.some(user => user?.userId?._id === userProfile.userId._id)) {
      setIsCurrentUserInConnection(true);
      if (authState.connectionRequest.find(user => user?.userId?._id === userProfile.userId._id).
        status_accepted === true) {
        setIsConnectionNull(false);
      }
    }
  }, [authState.connections, authState.connectionRequest]);

  const handleDownloadResume = async () => {
    try {
      const response = await clientServer.get(`/user/download_resume?id=${userProfile.userId._id}`);
      
      if (response.data?.message) {
        window.open(`${BASE_URL}/${response.data.message}`, "_blank");
      } else {
        console.error("Invalid response structure:", response.data);
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  return (
    <>
      <UserLayout>
        <DashboardLayout>
          <div className={styles.container}>
            <div className={styles.backDropContainer}>
              <img className={styles.backDrop} src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt={userProfile.name} />
            </div>
            <div className={styles.profileContainer_details}>
              <div style={{ display: "flex", gap: "0.7rem" }}>
                <div style={{ flex: "0.8" }}>
                  <div style={{ display: "flex", width: "fit-content", alignItems: "center" }}>
                    <h2 style={{ marginRight: "10px" }}>{userProfile.userId.name}</h2>
                    <p style={{ color: "grey" }}>@{userProfile.userId.username}</p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    {isCurrentUserInConnection ?
                      <button className={styles.connectionButton}>{isConnectionNull ? "pending" : "connected"}</button> :
                      <button onClick={() => {
                        dispatch(sendConnectionRequest({ token: localStorage.getItem('token'), user_id: userProfile.userId._id }))
                      }} className={styles.connectBtn}>Connect</button>}


                    <div
                      onClick={handleDownloadResume}
                      style={{ width: "1.2em", paddingLeft: "0.1rem", cursor: "pointer" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </div>

                  </div>

                </div >

                <div>
                  <p>{userProfile.bio}</p>
                </div>

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

          </div>
        </DashboardLayout>
      </UserLayout>
    </>
  )
}

export default ViewProfilePage

export async function getServerSideProps(context) {
  try {
    const request = await clientServer.get("/user/get_profile_based_on_username", {
      params: {
        username: context.query.username
      },
    });

    return { props: { userProfile: request.data.profile || {} } };
  } catch (error) {
    return { props: { userProfile: {} } }; // Return an empty object to prevent crashes
  }
}

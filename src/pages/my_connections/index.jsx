import React, { useEffect } from 'react'
import UserLayout from '@/layout/UserLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptConnection, getMyConnectionRequest } from '@/config/redux/action/authAction'
import { useRouter } from 'next/router'
import styles from './index.module.css';
import { BASE_URL } from '@/config'
const MyConnectionPage = () => {

    const dispatch = useDispatch();

    const router = useRouter();

    const authState = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMyConnectionRequest({ token: localStorage.getItem("token") }));
    }, [])

    useEffect(() => {
        if (authState.connectionRequest.length != 0) {
        }
    }, [authState.connectionsRequest])

    return (
        <UserLayout>
            <DashboardLayout>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.7rem" }}>
                    <h1>My Connections</h1>
                    {authState.connectionRequest.length === 0 && <h1>No Connection Request Pending</h1>}
                    {authState.connectionRequest.length != 0 && authState.connectionRequest.filter((connection) => connection.status_accepted === null).map((user, index) => {
                        return (
                            <div onClick={() => {
                                router.push(`/view_profile/${user.userId.username}`);
                            }}
                                className={styles.userCard} key={index}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <div className={styles.profilePicture}>
                                        <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="Profile Pic" />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <h3>{user.userId.name}</h3>
                                        <p>{user.userId.username}</p>
                                    </div>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(AcceptConnection({
                                            connectionId: user._id,
                                            token: localStorage.getItem("token"),
                                            action: "accept",
                                        }))
                                    }}
                                        className={styles.connectionButton}>Accept</button>
                                </div>
                            </div>
                        )
                    })}
                    <h4>My Network</h4>
                    {authState.connectionRequest.filter((connection) => connection.status_accepted !== null).map((user, index) => {
                        return (
                            <div onClick={() => {
                                router.push(`/view_profile/${user.userId.username}`);
                            }}
                                className={styles.userCard} key={index}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <div className={styles.profilePicture}>
                                        <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="Profile Pic" />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <h3>{user.userId.name}</h3>
                                        <p>{user.userId.username}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </DashboardLayout>
        </UserLayout>
    )
}

export default MyConnectionPage
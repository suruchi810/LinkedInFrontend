import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import UserLayout from "@/layout/UserLayout";
export default function Home() {

  
  const router = useRouter();

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContainer_left}>
            <p>Connect with friends withoud exaggeration</p>
            <p>A True social media plateform, with stories no blufs!</p>
            <div onClick={()=>{
              router.push("/login")
            }} className={styles.buttonJoin}>
              <p>Join Now</p>
            </div>
          </div>
          <div className={styles.mainContainer_right}>
          {/* image */}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

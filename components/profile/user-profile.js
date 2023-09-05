import ProfileForm from './profile-form';
import { useState, useEffect } from 'react'
import classes from './user-profile.module.css';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router'





function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);

  // const router = useRouter()
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       router.push("/auth");
  //     }
  //     else {
  //       setIsLoading(false);
  //     }
  //   })
  // }, [])




  // // Redirect away if NOT auth

  // if (isLoading) {
  //   return <h1 className={classes.profile}>Loading.....</h1>;
  // }


  async function ChangePasswordHandler(passwordData) {
    try {

      const response = await fetch('/api/user/change-password', {
        method: 'PATCH',
        body: JSON.stringify(passwordData),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={ChangePasswordHandler} />
    </section>
  );
}

export default UserProfile;

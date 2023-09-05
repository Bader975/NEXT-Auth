import classes from './profile-form.module.css';
import { useState, useRef } from 'react';


function ProfileForm(props) {

  const oldPassWordRef = useRef()
  const newPassWordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPassWordRef.current.value;
    const enteredNewPassword = newPassWordRef.current.value;

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassWordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPassWordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

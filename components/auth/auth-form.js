import { useState, useRef } from 'react';
import classes from './auth-form.module.css';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router';


async function createUser(email, password) {
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = res.json();
    if (!res.ok) {
      throw new Error('error !!!!!');
    }
    return data;

  } catch (error) {
    console.log(error.message);
  }

}
function AuthForm() {
  const router = useRouter();
  const emailRef = useRef()
  const passWordRef = useRef()
  const [isLogin, setIsLogin] = useState(true);
  const [erorr, setErorr] = useState(null);
  const [msg, setMseg] = useState("");


  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enterdEmail = emailRef.current.value;
    const enterdPassWord = passWordRef.current.value;
    if (isLogin) {
      const result = await signIn('credentials',
        {
          redirect: false,
          email: enterdEmail,
          password: enterdPassWord,

        })
      if (!result.error) {
        // set auth state to login 
        router.replace('/profile')
      }
    }
    else {
      try {

        const result = await createUser(enterdEmail, enterdPassWord);
        setMseg(result)

        console.log(result);
      } catch (error) {
        console.log(error);
      }

    }
  }
  // console.log(msg.message);
  return (
    <section className={classes.auth}>
      <h1>
        {erorr}
      </h1>

      {msg.message && <h1>{msg && msg.message}</h1>}

      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} onChange={(e) => console.log(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passWordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}


export default AuthForm;

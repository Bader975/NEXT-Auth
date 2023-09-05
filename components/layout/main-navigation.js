import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"
import classes from './main-navigation.module.css';

function MainNavigation() {
  const { data: session, status } = useSession()
 
  console.log(status);


  function logOutHandler(){
    signOut()
  }
  return (
    <header className={classes.header}>
      <Link href='/'>

        <div className={classes.logo}>Next Auth</div>

      </Link>
      <nav>

        <ul>
          {!session && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}
          {session && status === "authenticated" && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}

          {session && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
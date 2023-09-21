import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/react';






function AuthPage() {
  return <AuthForm />;
}


export async function getServerSideProps({ req }) {
  //
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      }
    }
  }
  return {
    props: { session },
  }

}
export default AuthPage;

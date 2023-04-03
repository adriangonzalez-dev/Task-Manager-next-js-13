import { GoogleAuthProvider,signInWithPopup,auth } from "./firebase"
import { useRouter } from "next/navigation"
import useAuth from '../tasks/hooks/useAuth'

export const useSocialLogin = () => {
    const router = useRouter();
    const {userDispatch} = useAuth();
    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const responseGoogle = await signInWithPopup(auth, provider);
            const data = {
                name: responseGoogle.user.displayName.split(' ')[0],
                lastName: responseGoogle.user.displayName.split(' ')[1],
                email: responseGoogle.user.email,
                avatar: responseGoogle.user.photoURL,
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/auth/google`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const dataResponse = await response.json();
            localStorage.setItem('token', JSON.stringify(dataResponse.token));
            console.log(dataResponse)
            userDispatch({
                type: 'LOGIN',
                payload: dataResponse.user
            })
            router.push('/tasks');
        } catch (error) {
            console.log(error)
        }
    }
  return {
    loginWithGoogle
  }
}

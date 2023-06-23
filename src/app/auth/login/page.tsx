'use client';
import { auth, provider } from '@/context/firebase';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
const LoginPage = () => {
  const router = useRouter();
  const LoginUser = async (
    event: FormEvent<HTMLFormElement>,
    formData: FormData
  ) => {
    event.preventDefault();
    const email: string = formData.get('email')?.toString() ?? '';
    const password: string = formData.get('password')?.toString() ?? '';
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          Cookies.set('userId', userCredential.user.uid);
          Cookies.set('userData', JSON.stringify(userCredential.user));
          router.prefetch('/');
          router.push('/');
          alert('use signined');
        }
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const signinWithGooglePopup = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        Cookies.set('userId', user.uid);
        Cookies.set('userData', JSON.stringify(user));
        router.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        console.log({
          errorCode,
          errorMessage,
          email,
        });
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(errorMessage);
      });
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-6 rounded-lg flex flex-col gap-3 bg-[#f5f5f5]">
        <h2 className="text-3xl font-bold mb-4">LOGIN</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => LoginUser(e, new FormData(e.currentTarget))}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray-600 rounded-lg"
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            className="px-4 py-2 border border-gray-600 rounded-lg"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Login
          </button>
        </form>
        <button
          type="button"
          onClick={() => signinWithGooglePopup()}
          className="text-black bg-[#e1f7ff] hover:bg-[#b5e2ff] focus:ring-4 focus:ring-[#d1e4ff] font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center text-center"
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="black"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </button>
        <Link className="px-5" href={'/auth/signup'}>
          Not a member? Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

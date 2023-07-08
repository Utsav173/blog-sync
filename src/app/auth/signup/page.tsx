'use client';
import { auth } from '@/context/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

const SignUpPage = () => {
  const router = useRouter();
  const SignUpUser = async (
    event: FormEvent<HTMLFormElement>,
    formData: FormData
  ) => {
    event.preventDefault();
    const email: string = formData.get('email')?.toString() ?? '';
    const password: string = formData.get('password')?.toString() ?? '';

    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        router.prefetch('/auth/login');
        alert('use signined');
        router.push('/auth/login');
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-6 rounded-lg bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => SignUpUser(e, new FormData(e.currentTarget))}
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
            placeholder="Password"
            className="px-4 py-2 border border-gray-600 rounded-lg"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>
          <Link href={'/auth/login'}>Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

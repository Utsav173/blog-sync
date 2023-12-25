'use client';
import { SignUpUser } from '@/context/func';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const {push } = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const res = await SignUpUser(formData);
    if (res?.error) {
      alert(res.error);
    } else {
      push('/auth/login');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-6 rounded-lg bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <form className="flex flex-col gap-4" action={handleSubmit}>
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

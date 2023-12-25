"use client";

import { LoginUser } from "@/context/func";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const LoginPage = () => {
  const { push } = useRouter();
  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await LoginUser(formData);
      if (response?.error) {
        alert(response.error);
      } else {
        push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="p-6 rounded-lg flex flex-col gap-3 bg-[#f5f5f5]">
          <h2 className="text-3xl font-bold mb-4">LOGIN</h2>
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
          <Link className="px-5" href={"/auth/signup"}>
            Not a member? Sign up
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPage;

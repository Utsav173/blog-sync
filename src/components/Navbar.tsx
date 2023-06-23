'use client';
import MyContext from '@/context';
import { auth } from '@/context/firebase';
import { signOut } from 'firebase/auth';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function Navbar() {
  const { setIsLogin, isLogin } = useContext(MyContext);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState<any | undefined>();
  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  useEffect(() => {
    const userData = Cookies.get('userData');
    if (userData !== undefined) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const router = useRouter();
  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        setIsProfileOpen(false);
        setIsLogin(false);
        setUserData(undefined);
        console.log('logout');
        router.refresh();
        Cookies.remove('userId');
        Cookies.remove('userData');
        alert('logout successfully');
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="font-semibold text-slate-900 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 mr-2 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z"
          />
        </svg>
        BlogSync
      </h2>
      <div className="flex gap-3">
        <Link
          href={'/blog/create'}
          className="flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm focus:outline-none"
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2"
            aria-hidden="true"
          >
            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
          </svg>
          Create New
        </Link>
        {(isLogin || userData) && (
          <div className="relative">
            <button
              className="rounded-md bg-[#dcffe5] px-3 py-2"
              onClick={toggleProfilePopup}
            >
              Profile
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-2 px-4">
                  <div className="flex items-center gap-4">
                    {(userData.photoURL != undefined ||
                      userData.photoURL != null) && (
                      <Image
                        width={100}
                        height={100}
                        alt="Profile"
                        src={userData.photoURL}
                        className="w-8 h-8 rounded-full"
                      />
                    )}

                    <div className="flex flex-col justify-start items-start gap-1">
                      <p className="text-sm font-medium text-gray-800">
                        {userData.displayName}
                      </p>
                      <p className="text-xs text-gray-600">{userData.email}</p>
                      <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-3 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

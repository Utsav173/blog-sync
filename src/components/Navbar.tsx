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
  const { setIsLogin } = useContext(MyContext);
  const [userData, setUserData] = useState<any>(undefined);
  useEffect(() => {
    if (Cookies.get('userData')! != undefined) {
      setUserData(JSON.parse(Cookies.get('userData')!));
    } else {
      setUserData(undefined);
    }
  }, []);

  const router = useRouter();
  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        setIsLogin(false);
        setUserData(undefined);
        // console.log('logout');
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

  const changeTheme = () => {
    const randomTheme = [
      'light',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'cyberpunk',
      'garden',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'cmyk',
      'autumn',
      'acid',
      'lemonade',
      'winter'
    ];

    const currentTheme = document.documentElement.dataset.theme;
    const randomIndex = Math.floor(Math.random() * randomTheme.length);
    const randomThemeName = randomTheme[randomIndex];

    if (currentTheme === randomThemeName) {
      // If the random theme is the same as the current theme, choose a different one
      const nextRandomIndex = (randomIndex + 1) % randomTheme.length;
      document.documentElement.dataset.theme = randomTheme[nextRandomIndex];
    } else {
      document.documentElement.dataset.theme = randomThemeName;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="font-semibold flex items-center">
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
      <div className="dropdown dropdown-end dropdown-hover">
        <label tabIndex={0} className="btn m-1">
          Menu
        </label>

        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-56 space-y-2">
          <li>
            <button
              onClick={changeTheme}
              className="btn btn-sm w-full text-left"
            >
              Change Theme
            </button>
          </li>
          <li>
            <Link href="/blog/create" className="btn btn-sm">
              Create New
            </Link>
          </li>
          {userData !== undefined && (
            <>
              <li>
                <details>
                  <summary className="btn btn-sm w-full text-left">
                    Profile
                  </summary>
                  <ul className="space-y-1">
                    <li>
                      <div className="flex items-center">
                        {userData != undefined && (
                          <Image
                            width={50}
                            height={50}
                            alt="Profile"
                            src={userData?.photoURL}
                            className="rounded-full h-7 w-7 object-fill"
                          />
                        )}
                        <p>{userData.displayName}</p>
                      </div>
                    </li>
                    <li>
                      <p>{userData.email}</p>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-3 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

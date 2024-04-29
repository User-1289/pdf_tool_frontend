'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
export const SignInButton = ({uid}) => {
  const { data: session } = useSession();
  const [isUserSignedIn, updateUserAuthState] = useState(false);
  const [showAcList, acListVis] = useState(false)
  const [userLoggedInFirst, setUserLoggedInFirst] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem("firstLogin") || "";
    }
    return "";
  });
  
  useEffect(() => {
    console.log(userLoggedInFirst);
    if (userLoggedInFirst === "true") {
      window.location.href = "/dashboard";
      localStorage.removeItem("firstLogin"); // Corrected case for "firstLogin"
    }
  }, [userLoggedInFirst]);

  useEffect(() => {
    if (window != null && session && session.user) {
      updateUserAuthState(true);
      uid(session.user.id)
     // window.location.href = "/dashboard"
    }


  }, [session]);

  function UserList(){
    return(
      <div className="absolute top-5 right-10 z-40 bg-gray-100 shadow-md rounded-lg p-10">
        <button onClick={() => {signOut()}} className='text-left align-start'>Sign Out</button>  
      </div>
    )
  }

  return (
    <>
      {isUserSignedIn ? (
        <div className="cursor-pointer z-50">
          <img onClick={() => {acListVis(!showAcList)}} src={session.user.image} width={30} height={30} className="rounded-2xl" />
          {/*<button onClick={() => {signOut()}} className="text-red-600">
            Sign out
      </button>*/}
        </div>
      ) : (
        <button onClick={() => {signIn(); localStorage.setItem("firstLogin", "true")}} className="text-green-600 ml-auto">
          Sign In
        </button>
      )}
      {showAcList && <UserList/>}
    </>
  );
};

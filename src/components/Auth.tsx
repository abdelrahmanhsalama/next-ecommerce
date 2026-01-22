import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Auth = ({
  setHamburgerMenu,
}: {
  setHamburgerMenu?: (hamburgerMenu: boolean) => void;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [authMenu, setAuthMenu] = useState(false);

  if (session) {
    return (
      <div className="relative">
        <button
          className={`lg:hover:bg-[#F5F5F5] rounded-md py-2 px-4 transition duration-250 cursor-pointer ${authMenu ? "bg-[#F5F5F5] rounded-b-none rounded-t-md" : ""}`}
          onClick={() => {
            setHamburgerMenu?.(false);
            setAuthMenu((prev) => !prev);
          }}
        >
          Hello, {session.user?.name}!
        </button>
        {authMenu && (
          <div className="absolute z-10 bg-[#F5F5F5] w-full rounded-b-md">
            <ul className="list-none p-4 space-y-2">
              <li
                className="cursor-pointer hover:font-medium"
                onClick={() => {
                  router.push("/account");
                  setAuthMenu(false);
                }}
              >
                Account Page
              </li>
              <li
                className="cursor-pointer hover:font-medium"
                onClick={async () => {
                  setAuthMenu(false);
                  await signOut({ callbackUrl: "/" });
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (!session) {
    return (
      <button
        className="text-white bg-black border-2 border-black rounded-md py-2 px-4 lg:hover:text-black lg:hover:bg-white transition duration-250 cursor-pointer"
        onClick={() => signIn("google")}
      >
        Sign In
      </button>
    );
  }
};

export default Auth;

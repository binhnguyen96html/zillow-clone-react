import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setPageState('Profile');
      }else{
        setPageState('Sign in')
      }
    })
  },[auth])

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50 ">
      <header className="flex justify-between items-center px-3 py-3
      max-w-6xl mx-auto">
        {/* ================================================================ */}
        <div>
          <ul className="flex space-x-10">
            <li
              className={`py-3 text-sm font-semibold text-black
            border-b-[3px] border-b-transparent
            }`}
            >
              Buy
            </li>
            <li
              className={`py-3 text-sm font-semibold text-black
            border-b-[3px] border-b-transparent
            }`}
            >
              Rent
            </li>
            <li
              className={`py-3 text-sm font-semibold text-black
            border-b-[3px] border-b-transparent
            }`}
            >
              Sell
            </li>
          </ul>
        </div>

        {/*LOGO ================================================================ */}

        <div>
          <img
            src="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
            alt="logo"
            className="h-9 cursor-pointer"
            onClick={()=>navigate('/')}
          />
        </div>

        {/* ================================================================ */}

        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black
            border-b-[3px] border-b-transparent
            ${pathMatchRoute("/") && "text-blue-500 border-b-blue-700"}`}
            onClick={()=>navigate('/')}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black
            border-b-[3px] border-b-transparent
            ${pathMatchRoute("/offers") && "text-blue-500 border-b-blue-700"}`}
            onClick={()=>navigate('/offers')}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black
            border-b-[3px] border-b-transparent
            ${ (pathMatchRoute("/sign-in") 
            || pathMatchRoute('/profile') )
             && "text-blue-500 border-b-blue-700"}`}
            onClick={()=>navigate('/profile')}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

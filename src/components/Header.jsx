import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50 ">
      <header className="flex justify-between items-center px-3 py-3 max-w-6xl mx-auto">
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
            ${pathMathRoute("/") && "text-blue-500 border-b-blue-500"}`}
            onClick={()=>navigate('/')}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black
            border-b-[3px] border-b-transparent
            ${pathMathRoute("/offers") && "text-blue-500 border-b-blue-500"}`}
            onClick={()=>navigate('/offers')}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black
            border-b-[3px] border-b-transparent
            ${pathMathRoute("/sign-in") && "text-blue-500 border-b-blue-500"}`}
            onClick={()=>navigate('/sign-in')}
            >
              Sign in
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

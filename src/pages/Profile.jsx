import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div>
      <section className="max-w-6xl mx-auto flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>

        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* NAME INPUT  */}
            <input
              className="mb-6 w-full  px-4 py-2 text-xl text-gray-700
            bg-white border border-gray-300 rounded
            transition ease-in-out"
              type="text"
              id="name"
              value={name}
              disabled
            />

            {/* EMAIL INPUT  */}
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700
            bg-white border border-gray-300 rounded
            transition ease-in-out"
              type="text"
              id="email"
              value={email}
              disabled
            />

            {/* EDIT  */}
            <div
              className="flex justify-between whitespace-nowrap
            text-sm sm:text-lg mb-6"
            >
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  className="text-red-600 hover:text-red-700
                 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  Edit
                </span>
              </p>
              <p
                className="text-blue-600 hover:text-blue-800
              transition duration-200 ease-in-out cursor-pointer"
                onClick={onLogout}
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

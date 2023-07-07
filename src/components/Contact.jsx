import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  //FETCH LANDLORD'S CONTACT INFO
  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord information!");
      }
    };
    getLandlord();
  }, [userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord !== null && (
        <div
        className="flex flex-col w-full"
        >
          <p className="">
            Contact {landlord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-3">
            <textarea
            className="w-full px-4 py-2 text-sm
            text-gray-700 bg-white
            border border-gray-300 
            rounded transition duration-150 ease-in-out
            focus:text-gray-700 focus:bg-white
            focus:border-slate-600"
              name="message"
              id="message"
              value={message}
              rows="2"
              onChange={onChange}
            ></textarea>
          </div>

          <a
            href={`mailto:${landlord.email}
            ?Subject=${listing.name}
            &body=${message}`}
          >
            <button
              className="px-7 py-3 w-full mb-6
                bg-blue-600 text-white font-medium text-sm uppercase text-center
                rounded  shadow-md hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-800 focus:shadow-lg
                transition duration-150 ease-in-out"
                type="button"
            >
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
}

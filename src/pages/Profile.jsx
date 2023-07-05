import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";


export default function Profile() {
  const [changeDetail, setChangeDetail] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const [listings, setListings] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update displayName in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated!");
    } catch (error) {
      toast.error("Could not update the profile details.");
    }
  };

  useEffect(() => {
    async function fetchUserListing() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListing();
  }, [auth.currentUser.uid]);

  const onDelete = async (listingID) => {
    if(window.confirm("Are you sure you want to delete?")){
      await deleteDoc(doc(db,'listings', listingID))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success('Successfully deleted!')
    }
  }

  const onEdit = (listingID) =>{
    navigate(`/edit-listing/${listingID}`);
  }

  return (
    <div>
      <section className="max-w-6xl mx-auto flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>

        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* NAME INPUT  */}
            <input
              className={`mb-6 w-full  px-4 py-2 text-xl text-gray-700
            bg-white border border-gray-300 rounded
            transition ease-in-out 
            ${changeDetail && "bg-red-200 focus:bg-red-200"}`}
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
            />

            {/* EMAIL INPUT  */}
            <input
              className="mb-6 w-full  px-4 py-2 text-xl text-gray-700
              bg-white border border-gray-300 rounded
              transition ease-in-out"
              type="text"
              id="email"
              value={email}
              disabled
              onChange={onChange}
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
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                >
                  {changeDetail ? "Apply change" : "Edit"}
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase
          px-7 py-3 text-sm font-medium rounded 
          shadow-md hover:bg-blue-700
          transition duration-150 ease-in-out hover:shadow-lg
          active:bg-blue-800"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome
                className="mr-2 text-3xl bg-red-200 rounded-full 
              p-1 border-2"
              />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>

      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 
            className="text-2xl text-center font-semibold mb-6 ">My Listings</h2>
            <ul 
            className="sm:grid sm:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
            mt-6 mb-6">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={()=>onDelete(listing.id)}
                  onEdit={()=>onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

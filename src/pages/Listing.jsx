import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopy, setShareLinkCopy] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={EffectFade}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]})
                center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* COPY FUNCTION  */}
      <div
        className="fixed top-[13%] right-[3%]
        z-10 bg-white cursor-pointer
        border-2 border-gray-400 rounded-full
        w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopy(true);
          setTimeout(() => {
            setShareLinkCopy(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopy && (
        <p
          className="fixed top-[20%] right-[5%] font-semibold
      border-2 border-gray-400 rounded-md bg-white z-10
      p-2"
        >
          Link Copied
        </p>
      )}

      {/* INFO DETAIL  */}
      <div
        className="m-4 p-4 rounded-lg
        shadow-lg bg-white
        flex flex-col md:flex-row max-w-6xl
        lg:mx-auto lg:space-x-6"
      >
        <div className="w-full">
          {/* NAME & PRICE  */}
          <p
            className="text-2xl font-bold mb-3
          text-blue-900"
          >
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>

          {/* ADDRESS */}
          <p
            className="flex items-center mt-6 mb-3
          font-semibold "
          >
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>

          {/* RENT / SALE  */}
          <div
            className="flex justify-start items-center
          space-x-4 w-[75%]"
          >
            <p
              className="bg-red-800 w-full max-w-[200px] 
            rounded-md p-1 text-white text-center font-semibold
            shadow-md"
            >
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p
                className="w-full max-w-[200px] bg-green-800
              rounded-md p-1
              text-white text-center font-semibold shadow-md"
              >
                ${" "}
                {(+listing.regularPrice - +listing.discountedPrice)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                discount
              </p>
            )}
          </div>

          {/* DESCRIPTION  */}
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description</span> -{" "}
            {listing.description}
          </p>

          {/* ICON  */}
          <ul
            className="flex mb-6
            items-center space-x-2 sm:space-x-10
          text-sm font-semibold"
          >
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? "Parking Spot" : "No Parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? "Furnished" : "No Furnished"}
            </li>
          </ul>

          {/* BUTTON  */}
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                className="px-7 py-3 w-full
           bg-blue-600 text-white font-medium text-sm uppercase text-center
           rounded  shadow-md hover:bg-blue-700 hover:shadow-lg
           focus:bg-blue-700 focus:shadow-lg
           transition duration-150 ease-in-out"
                onClick={() => setContactLandlord(true)}
              >
                Contact LandLord
              </button>
            </div>
          )}

          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>

        {/* MAP  */}
        <div
          className="bg-violet-300
            w-full h-[200px] lg-[400px]
            z-10 overflow-x-hidden"
        ></div>
      </div>
    </main>
  );
}

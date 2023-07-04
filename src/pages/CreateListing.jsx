import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {db} from '../firebase';
import { useNavigate } from "react-router";

export default function CreateListing() {
    const navigate = useNavigate();
  const auth = getAuth();
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;

  const onChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    //Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    //Text/boolean/number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price!");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum 6 images are allowed!");
      return;
    }

    let geoLocation = {};
    let location;
    if (geoLocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );

      const data = await response.json();

      console.log(data);

      geoLocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geoLocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      if (location === undefined) {
        setLoading(false);
        toast.error("Please enter a correct address!");
        return;
      }
    } else {
      geoLocation.lat = latitude;
      geoLocation.lng = longitude;
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images]
        .map((image) => storeImage(image)))
        .catch((error) => {
          setLoading(false);
          toast.error("Images not uploaded!");
          return;
        })
    // console.log(imgUrls)

    const formDataCopy = {
        ...formData,
        imgUrls,
        geoLocation,
        timestamp: serverTimestamp(),
        userRef: auth.currentUser.uid,
    };


    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
    setLoading(false);
    toast.success('A new listing created!');
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>

      {/* FORM ----------------------------------------------- */}
      <form onSubmit={onSubmit}>
        {/* SELL/RENT--------------  */}
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          {/* SELL  */}
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase
            shadow-md rounded hover:shadow-lg focus:shadow-lg
            active:shadow-lg transition duration-150 ease-in-out w-full
            ${
              type === "sale"
                ? "bg-slate-600 text-white"
                : "bg-white text-black"
            }`}
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
          >
            Sell
          </button>

          {/* RENT  */}
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase
            shadow-md rounded hover:shadow-lg focus:shadow-lg
            active:shadow-lg transition duration-150 ease-in-out w-full
            ${
              type === "rent"
                ? "bg-slate-600 text-white"
                : "bg-white text-black"
            }`}
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
          >
            Rent
          </button>
        </div>

        {/* NAME  */}
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          className="w-full px-4 py-2 text-xl text-gray-700 
        bg-white border border-gray-300 rounded
        transition duration-150 ease-in-out mb-6
        focus:text-gray-700 focus:bg-white focus:border-slate-600"
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          maxLength={32}
          minLength={3}
          required
          onChange={onChange}
        />

        {/* BEDS AND BATHS  */}
        <div className="flex space-x-6 mb-6">
          {/* BEDS */}
          <div>
            <p className="text-lg font-semibold ">Beds</p>
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 text-center
            bg-white border border-gray-300 rounded
            transition duration-150 ease-in-out
            focus:text-gray-700 focus:bg-white focus:border-slate-600"
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min={1}
              max={50}
              required
            />
          </div>
          {/* BATHS */}
          <div>
            <p className="text-lg font-semibold ">Bathrooms</p>
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 text-center
            bg-white border border-gray-300 rounded
            transition duration-150 ease-in-out
            focus:text-gray-700 focus:bg-white focus:border-slate-600"
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min={1}
              max={50}
              required
            />
          </div>
        </div>

        {/* PARKING SPOT  */}
        <p className="text-lg mt-6 font-semibold">Parking spot</p>
        <div className="flex">
          {/* yes  */}
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase
            shadow-md rounded hover:shadow-lg focus:shadow-lg
            active:shadow-lg transition duration-150 ease-in-out w-full
            ${parking ? "bg-slate-600 text-white" : "bg-white text-black"}`}
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
          >
            Yes
          </button>

          {/* no  */}
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase
            shadow-md rounded hover:shadow-lg focus:shadow-lg
            active:shadow-lg transition duration-150 ease-in-out w-full
            ${!parking ? "bg-slate-600 text-white" : "bg-white text-black"}`}
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>

        {/* FURNISHED  */}
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex">
          {/* yes  */}
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase
            shadow-md rounded hover:shadow-lg focus:shadow-lg
            active:shadow-lg transition duration-150 ease-in-out w-full
            ${furnished ? "bg-slate-600 text-white" : "bg-white text-black"}`}
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
          >
            Yes
          </button>

          {/* no  */}
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase
            shadow-md rounded hover:shadow-lg focus:shadow-lg
            active:shadow-lg transition duration-150 ease-in-out w-full
            ${!furnished ? "bg-slate-600 text-white" : "bg-white text-black"}`}
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>

        {/* ADDRESS  */}
        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          className="w-full px-4 py-2 text-xl text-gray-700 
        bg-white border border-gray-300 rounded
        transition duration-150 ease-in-out mb-6
        focus:text-gray-700 focus:bg-white focus:border-slate-600"
          type="text"
          id="address"
          value={address}
          placeholder="Address"
          required
          onChange={onChange}
        />
        {!geoLocationEnabled && (
          <div
            className="flex space-x-6 justify-start
          mb-6"
          >
            {/* latitude  */}
            <div>
              <p className="text-lg font-semibold">Latitude</p>
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 text-center
              bg-white border border-gray-300 rounded
              transition duration-150 ease-in-out
              focus:bg-white focus:text-gray-700 
              focus:border-slate-600"
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                min={-90}
                max={90}
                required
              />
            </div>
            {/* longitude  */}
            <div>
              <p className="text-lg font-semibold">Longitude</p>
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 text-center
              bg-white border border-gray-300 rounded
              transition duration-150 ease-in-out
              focus:bg-white focus:text-gray-700 
              focus:border-slate-600"
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                min={-180}
                max={180}
                required
              />
            </div>
          </div>
        )}

        {/* DESCRIPTION  */}
        <p className="text-lg font-semibold">Description</p>
        <textarea
          className="w-full px-4 py-2 text-xl text-gray-700 
        bg-white border border-gray-300 rounded
        transition duration-150 ease-in-out mb-6
        focus:text-gray-700 focus:bg-white focus:border-slate-600"
          type="text"
          id="description"
          value={description}
          placeholder="Description"
          required
          onChange={onChange}
        />

        {/* OFFERS  */}
        <p className="text-lg font-semibold">Offer</p>
        <div className="flex mb-6">
          {/* yes  */}
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase
            shadow-md rounded hover:shadow-lg focus:shadow-lg
            active:shadow-lg transition duration-150 ease-in-out w-full
            ${offer ? "bg-slate-600 text-white" : "bg-white text-black"}`}
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
          >
            Yes
          </button>

          {/* no  */}
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase
            shadow-md rounded hover:shadow-lg focus:shadow-lg
            active:shadow-lg transition duration-150 ease-in-out w-full
            ${!offer ? "bg-slate-600 text-white" : "bg-white text-black"}`}
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>

        {/* REGULAR PRICE  */}
        <div className="flex items-center mb-6">
          <div>
            <p className="text-lg font-semibold">Regular price</p>
            <div
              className="flex w-full justify-center items-center
            space-x-6"
            >
              <input
                className="w-full px-4 py-2 text-xl text-gray-700
                    bg-white border border-gray-300 rounded
                    transition duration-150 ease-in-out
                    focus:text-gray-700 focus:bg-white 
                    focus:border-slate-600 text-center"
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="50"
                max="400000000"
                required
              />
              {type === "rent" && (
                <div>
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DISCOUNTED PRICE  */}
        {offer && (
          <div className="flex items-center mb-6">
            <div>
              <p className="text-lg font-semibold">Discounted price</p>
              <div
                className="flex w-full justify-center items-center
            space-x-6"
              >
                <input
                  className="w-full px-4 py-2 text-xl text-gray-700
                    bg-white border border-gray-300 rounded
                    transition duration-150 ease-in-out
                    focus:text-gray-700 focus:bg-white 
                    focus:border-slate-600 text-center"
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  min="50"
                  max="400000000"
                  required={offer}
                />
                {type === "rent" && (
                  <div>
                    <p className="text-md w-full whitespace-nowrap">
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* IMAGE  */}
        <div className="mb-6">
          <p className="text-lg font-semibold">Image</p>
          <p className="text-gray-600">
            The first image will be the cover (max 6)
          </p>
          <input
            className="w-full px-3 py-1.5 text-gray-700
          bg-white border border-gray-300 rounded
          transition  duration-150 ease-in-out
          focus:bg-white focus:border-slate-600"
            type="file"
            id="image"
            onChange={onChange}
            accept=".jpg, .png, .jpeg"
            multiple
            required
          />
        </div>

        {/* SUBMIT  */}
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600
         text-white font-medium font-sm uppercase
         rounded shadow-md
         hover:bg-blue-700 hover:shadow-lg
         focus:bg-blue-700 focus:shadow-lg
         active:bg-blue-800 active:shadow-lg
         transition duration-150 ease-in-out"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
}

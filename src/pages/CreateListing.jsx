import React, { useState } from "react";

export default function CreateListing() {
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
  } = formData;

  const onChange = () => {};
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>

      {/* FORM ----------------------------------------------- */}
      <form>
        {/* SELL/RENT--------------  */}
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          {/* SELL  */}
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase
            shadow-md rounded hover:shadow-lg focus:shadow-lg
            active:shadow-lg transition duration-150 ease-in-out w-full
            ${
              type === "sell"
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

        {/* DESCRIPTION  */}
        <p className="text-lg font-semibold">Description</p>
        <textarea
          className="w-full px-4 py-2 text-xl text-gray-700 
        bg-white border border-gray-300 rounded
        transition duration-150 ease-in-out mb-6
        focus:text-gray-700 focus:bg-white focus:border-slate-600"
          type="text"
          id="Description"
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
         transition duration-150 ease-in-out">
          Create Listing
        </button>
      </form>
    </main>
  );
}

"use client ";

import { BiSearch } from "react-icons/bi";

export default function Search() {
  return (
    <div className="flex flex-row items-center justify-between border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="text-sm font-semibold px-6">Any Where</div>
      <div className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center">
        Any Week
      </div>
      <div className="pl-6 pr-2 flex flex-row items-center gap-3 text-sm font-semibold px-6 text-gray-600">
        <div className="hidden sm:block">Add Guests</div>
        <div className="p-2 bg-rose-500 rounded-full text-white">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
}

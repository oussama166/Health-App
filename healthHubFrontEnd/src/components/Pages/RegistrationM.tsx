import { createDoctor } from "@/api/Medecin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { speciality,Ville } from "@/manifest.json";
import { Doctor } from "@/type";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const RegistrationM = () => {
  const refDrop = useRef<HTMLSpanElement>(null);
  const refVille = useRef<HTMLSpanElement>(null);
  const navigation = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Doctor = {
      id: 0,
      userName: e.currentTarget.username.value,
      name: e.currentTarget.name.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      price: Number(e.currentTarget.consultationp.value),
      specialty: (refDrop.current as HTMLSpanElement).innerHTML,
      ville: (refVille.current as HTMLSpanElement).innerHTML,
      mapsUrl: "mapsUrl",
      consultations: [],
      avis: [],
    };
    const isCn = await createDoctor(data);
    if (isCn) {
      alert("Doctor created successfully");
      navigation("/Login");
    }
  };
  return (
    <div className="font-[sans-serif] bg-white text-black  flex">
      {/* Image Section */}
      <section className="w-full bg-[#3bb0ef] relative p-10">
        <div className="w-full font-Roboto">
          <div className="w-full">
            <h1 className="font-Rubik font-medium text-4xl text-healthHub-300">
              Health<span>HUB</span>
            </h1>
          </div>
        </div>
        {/* START Image */}
        <img
          src="/Backgound/RegistrationDoctor.svg"
          alt="Doctor registration illustration"
          className="absolute bottom-5 left-5"
          height={300}
          width={300}
        />
        {/* END Image */}
      </section>
      {/* Form Section */}
      <div className="w-full flex items-center md:p-8 p-6  h-full lg:w-11/12 lg:ml-auto">
        <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-healthHub-300">
              Create an account
            </h3>
          </div>
          <div>
            <label className="text-xs block mb-2">Full Name</label>
            <div className="relative flex items-center">
              <input
                name="name"
                type="text"
                required
                className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-healthHub-700 px-2 py-3 outline-none"
                placeholder="Enter name"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-[18px] h-[18px] absolute right-2"
                viewBox="0 0 24 24"
              >
                <circle cx="10" cy="7" r="6"></circle>
                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"></path>
              </svg>
            </div>
          </div>
          <div className="my-5">
            <label className="text-xs block mb-2">User name</label>
            <div className="relative flex items-center">
              <input
                name="username"
                type="text"
                required
                className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-healthHub-700 px-2 py-3 outline-none"
                placeholder="Enter name"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-[18px] h-[18px] absolute right-2"
                viewBox="0 0 24 24"
              >
                <circle cx="10" cy="7" r="6"></circle>
                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"></path>
              </svg>
            </div>
          </div>
          <div className="mt-10">
            <label className="text-xs block mb-2">Email</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="email"
                required
                className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-healthHub-700 px-2 py-3 outline-none"
                placeholder="Enter email"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-[18px] h-[18px] absolute right-2"
                viewBox="0 0 682.667 682.667"
              >
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z"></path>
                  </clipPath>
                </defs>
                <g
                  clipPath="url(#a)"
                  transform="matrix(1.33 0 0 -1.33 0 682.667)"
                >
                  <path
                    fill="none"
                    stroke-miterlimit="10"
                    stroke-width="40"
                    d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  ></path>
                  <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className="mt-10">
            <label className="text-xs block mb-2">Specialty</label>
            <Select>
              <SelectTrigger
                className="w-full py-2 px-4 text-base ring-offset-blue-500 focus-visible:ring-1 focus-visible:ring-blues-500"
                chevronDownIcon={false}
                name="speciality"
              >
                <SelectValue
                  placeholder="Internal Medicine"
                  defaultValue={"Internal Medicine"}
                  ref={refDrop}
                />
              </SelectTrigger>
              <SelectContent>
                {speciality.map((item, index) => (
                  <SelectItem className="text-base" key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-10">
            <label className="text-xs block mb-2">Ville</label>
            <Select>
              <SelectTrigger
                className="w-full py-2 px-4 text-base ring-offset-blue-500 focus-visible:ring-1 focus-visible:ring-blues-500"
                chevronDownIcon={false}
                name="speciality"
              >
                <SelectValue
                  placeholder="Select Ville"
                  defaultValue={"Maroc"}
                  ref={refVille}
                />
              </SelectTrigger>
              <SelectContent>
                {Ville.map((item, index) => (
                  <SelectItem className="text-base" key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-10">
            <label className="text-xs block mb-2">consultation price</label>
            <div className="relative flex items-center">
              <input
                name="consultationp"
                type="number"
                required
                className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-healthHub-700 px-2 py-3 outline-none"
                placeholder="Enter price"
              />
            </div>
          </div>

          <div className="mt-10">
            <label className="text-xs block mb-2">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                required
                className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-healthHub-700 px-2 py-3 outline-none"
                placeholder="Enter password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                viewBox="0 0 128 128"
              >
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-8">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 shrink-0 rounded"
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm">
              I accept the{" "}
              <a
                href="javascript:void(0);"
                className="text-healthHub-700 font-semibold hover:underline ml-1"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="w-max shadow-xl py-2.5 px-8 text-sm font-semibold rounded-md bg-transparent text-healthHub-700 border border-healthHub-700 focus:outline-none"
            >
              Register
            </button>
            <p className="text-sm mt-8">
              Already have an account?{" "}
              <a
                href="javascript:void(0);"
                className="text-healthHub-700 font-semibold hover:underline ml-1"
              >
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

import { getDoctors } from "@/api/Medecin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { speciality } from "@/manifest.json";
import { Doctor } from "@/type";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import doc from "../../../public/Doccardpic.jpeg";

export const FindDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsData = await getDoctors();
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };
    fetchDoctors();
  }, []);

  const [filterText, setFilterText] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedVille, setSelectedVille] = useState('');

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    setSelectedSpecialty(''); // Reset specialty filter when text filter is used
  };

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
    setFilterText(''); // Reset text filter when specialty filter is used
  };
 
  const handleVilleChange = (event) => {
    setSelectedVille(event.target.value);
    setFilterText(''); // Reset text filter when specialty filter is used
    setSelectedSpecialty('');
  };

  let filteredDoctors = doctors;

  if (filterText) {
    filteredDoctors = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(filterText.toLowerCase())
    );
  } else if (selectedSpecialty) {
    filteredDoctors = doctors.filter(doctor =>
      doctor.specialty === selectedSpecialty
    );
  } else if (selectedVille){
    filteredDoctors =doctors.filter(doctor =>
      doctor.ville === selectedVille
    ); 
  }

  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)));
  const Ville = Array.from(new Set(doctors.map(doctor => doctor.ville)));

  return (
    <div className="font-[sans-serif] bg-white text-black p-6">
      <div className="grid grid-cols-3 gap-4 my-28 mx-28">
        <select className="w-full border border-gray-300 rounded py-8 px-4 text-xl ring-offset-blue-500 focus-visible:ring-1 focus-visible:ring-blues-500" value={selectedSpecialty} onChange={handleSpecialtyChange}>
        <option value="">All Specialties</option>
        {specialties.map(specialty => (
          <option key={specialty} value={specialty}>
            {specialty}
          </option>
        ))}
      </select>
      <select className="w-full border border-gray-300 rounded py-8 px-4 text-xl ring-offset-blue-500 focus-visible:ring-1 focus-visible:ring-blues-500" value={selectedVille} onChange={handleVilleChange}>
        <option value="">Ville</option>
        {Ville.map(ville => (
          <option key={ville} value={ville}>
            {ville}
          </option>
        ))}
      </select>
        <input
          type="text"
          placeholder="Search Doctor by name..."
          className="w-full p-2 border border-gray-300 rounded"
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <div className="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Doctors</h2>
        {
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id} // Use the unique doctor.id as the key
                fullName={doctor.name}
                speciality={doctor.specialty}
                rating={2} // Assuming rating is hardcoded as 2
                price={doctor.price} // Assuming price is hardcoded as 10
              />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

const DoctorCard = ({
  fullName,
  speciality,
  rating,
  price,
}: {
  fullName: string;
  speciality: string;
  rating: number;
  image?: string;
  price: number;
}) => {
  const ratingMax = 5;
  const ratingOn = rating;
  const ratingOff = ratingMax - ratingOn;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <Link to={`/doctor/${fullName}`}>
      <div className="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
        <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16px"
            className="fill-gray-800 inline-block"
            viewBox="0 0 64 64"
          >
            <path
              d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
              data-original="#000000"
            ></path>
          </svg>
        </div>

        <div className="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
          <img
            src={doc}
            alt="Product 1"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="p-6 bg-white">
          <h3 className="text-lg font-bold text-gray-800">{fullName}</h3>
          <h4 className="text-lg text-gray-800 font-bold mt-2">
            {formatter.format(price)}
          </h4>
          <p className="text-gray-600 text-sm mt-2">{speciality}</p>

          <div className="flex space-x-2 mt-4">
            {Array.from({ length: ratingOn }, (_, index) => (
              <FaStar key={index} className="text-yellow-500" />
            ))}
            {Array.from({ length: ratingOff }, (_, index) => (
              <FaRegStar key={index} className="text-yellow-500" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

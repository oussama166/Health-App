import { putPatients } from "@/api/Patient";
import { Patient } from "@/type";
import { MouseEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
export const DossierMedicale = () => {
  const navigate = useNavigate();
  let patient: string | null = "";
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = async (e ) => {
    e.preventDefault();
    patient = localStorage.getItem("Patient");

    const Antecedent = (
      document.querySelector("input[name=Antecedent]") as HTMLInputElement
    ).value;

    const Allergies = (
      document.querySelector("input[name=Allergies]") as HTMLInputElement
    ).value;

    const Traitement = (
      document.querySelector("input[name=Traitement]") as HTMLInputElement
    ).value;

    if (patient != null) {
      const patientj: Patient = JSON.parse(patient);
      const patientE: Patient = {
        id: patientj.id,
        userName: patientj.userName,
        email: patientj.email,
        password: patientj.password,
        dossier_medicale: {
          id: patientj.dossier_medicale.id,
          antecedent: Antecedent,
          allergies: Allergies,
          traitement: Traitement,
        },
        consultations: [],
        avis: [],
      };
      setIsLoaded(!(await putPatients(patientE)));
      isLoaded && navigate("/Login");
    }
  };
  return (
    <div className="font-[sans-serif] h-screen bg-white text-black  flex">
      {/* Image Section */}
      <section className="w-full  bg-[#3bb0ef] relative p-10">
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
        <form className="max-w-lg w-full mx-auto">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-healthHub-300">
              Dossier-Medicale
            </h3>
          </div>
          <div className="mt-10">
            <label className="text-xs block mb-2">Antecedent</label>
            <div className="relative flex items-center">
              <input
                name="Antecedent"
                type="text"
                required
                className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-healthHub-700 px-2 py-3 outline-none"
                placeholder="Antecedent..."
              />
            </div>
          </div>
          <div className="mt-10">
            <label className="text-xs block mb-2">Allergies</label>
            <div className="relative flex items-center">
              <input
                name="Allergies"
                type="text"
                required
                className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-healthHub-700 px-2 py-3 outline-none"
                placeholder="Allergies..."
              />
            </div>
          </div>
          <div className="mt-10">
            <label className="text-xs block mb-2">Traitement</label>
            <div className="relative flex items-center">
              <input
                name="Traitement"
                type="text"
                required
                className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-healthHub-700 px-2 py-3 outline-none"
                placeholder="Traitement..."
              />
            </div>
          </div>
          <div className="mt-12">
            <button
              className="w-max shadow-xl py-2.5 px-8 text-sm font-semibold rounded-md bg-transparent text-healthHub-700 border border-healthHub-700 focus:outline-none"
              onClick={(e) => handleSubmit(e)}
            >
              Create Dossier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

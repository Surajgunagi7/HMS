import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addDoctor } from "../../../store/doctorSlice";
import { doctorService } from "../../../services/adminDashboardService";
import toast from "react-hot-toast";

const AddDoctor = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const formattedData = {
      name: data.name,
      email: data.email,
      password: data.password,
      specialization: data.specialization,
      phone: data.phone,
      role: "doctor",
      about: {
        experience: data.experience,
        education: data.education,
        description: data.about,
      },
    };
    try {
      const response = await doctorService.addDoctor(formattedData);
      console.log("Doctor added successfully:", response.data);
      
      dispatch(addDoctor(response.data));
      toast.success("Doctor added successfully!");
      reset();

    } catch (error) {
      console.error("Error adding doctor:", error.message);
      alert("Failed to add doctor. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 shadow rounded-md max-h-screen"
    >
      <h2 className="text-xl font-bold mb-6">Add Doctor</h2>
      <div className="flex justify-between">
        <div className="w-full mr-10">
          <div className="mb-5">
            <label className="block font-medium text-lg mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter doctor's name"
            />
          </div>
          <div className="mb-5">
            <label className="block font-medium mb-2 text-lg" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-5">
            <label
              className="block font-medium mb-2 text-lg"
              htmlFor="password"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-5">
            <label
              className="block font-medium text-lg mb-2"
              htmlFor="specialization"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              {...register("specialization", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter specialization"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="mb-5">
            <label
              className="block font-medium mb-2 text-lg"
              htmlFor="experience"
            >
              Experience
            </label>
            <input
              type="text"
              id="experience"
              {...register("experience", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter years of experience"
            />
          </div>
          <div className="mb-5">
            <label className="block font-medium mb-2 text-lg" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter contact number"
            />
          </div>
          <div className="mb-5">
            <label
              className="block font-medium mb-2 text-lg"
              htmlFor="education"
            >
              Education
            </label>
            <input
              type="text"
              id="education"
              {...register("education", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter education details"
            />
          </div>
          <div className="mb-5">
            <label className="block font-medium mb-2 text-lg" htmlFor="about">
              About
            </label>
            <textarea
              id="about"
              {...register("about", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Write a short description about the doctor"
              rows="4"
            ></textarea>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-3 mt-5 rounded hover:bg-green-600"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctor;

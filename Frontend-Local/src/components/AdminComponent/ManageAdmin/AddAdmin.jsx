import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addAdmin } from '../../../store/adminSlice';
import {adminService} from '../../../services/adminDashboardService'

const AddAdmin = () => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
  
    const onSubmit = async (data) => {
      try {
        const response = await adminService.addAdmin(data); 
        console.log('Admin added:', response);
        reset();
  
        dispatch(addAdmin(response));
      } catch (error) {
        console.error('Error adding admin:', error.message);
        alert('Failed to add admin. Please try again.');
      }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white shadow p-6 rounded-md max-h-screen">
      <h2 className="text-xl font-bold mb-4">Add Admin</h2>

      <div>
        <label className="block font-medium mb-1" htmlFor='name'>Name</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter admin's name"
        />
      </div>
      <div>
        <label className="block font-medium mb-1" htmlFor='email'>Email</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter email"
        />
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor='experience'>Experience</label>
        <input
          type="text"
          id="experience"
          {...register('experience', { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter years of experience"
        />
      </div>
      <div>
        <label className="block font-medium mb-1" htmlFor='phone'>Phone Number</label>
        <input
          type="text"
          id="phone"
          {...register('phone', { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter contact number"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddAdmin;
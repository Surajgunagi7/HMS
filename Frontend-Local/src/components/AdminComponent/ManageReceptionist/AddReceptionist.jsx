import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { addReceptionist } from '../../../store/receptionistSlice';
import { receptionistService } from '../../../services/adminDashboardService';
import { GlassCard, GlassButton, GlassInput, LoadingOverlay } from '../../common';
import toast from 'react-hot-toast';

const AddReceptionist = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { name, email, password, phone } = data;
      const response = await receptionistService.addReceptionist({
        name,
        email,
        password,
        phone,
        role: 'receptionist',
      });

      dispatch(addReceptionist(response.data));
      reset();
      toast.success('Receptionist added successfully!');
    } catch (error) {
      console.error('Error adding receptionist:', error.message);
      toast.error('Failed to add receptionist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingOverlay isLoading={isLoading} message="Adding receptionist...">
      <GlassCard className="animate-fadeInUp">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Receptionist</h2>
          <p className="text-gray-600">Create a new receptionist account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassInput
              icon={User}
              label="Full Name"
              type="text"
              placeholder="Enter full name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />

            <GlassInput
              icon={Mail}
              label="Email Address"
              type="email"
              placeholder="Enter email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email',
                },
              })}
              error={errors.email?.message}
            />

            <GlassInput
              icon={Lock}
              label="Password"
              type="password"
              placeholder="Enter password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={errors.password?.message}
            />

            <GlassInput
              icon={Phone}
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              {...register('phone', { required: 'Phone number is required' })}
              error={errors.phone?.message}
            />
          </div>

          <div className="flex justify-end pt-4">
            <GlassButton
              type="submit"
              variant="success"
              size="lg"
              loading={isLoading}
              className="text-black"
            >
              Add Receptionist
            </GlassButton>
          </div>
        </form>
      </GlassCard>
    </LoadingOverlay>
  );
};

export default AddReceptionist;

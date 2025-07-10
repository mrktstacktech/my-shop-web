import { useState, useCallback, useEffect } from 'react';
import { useAuthContext } from '@/context/auth-hook';
import { AuthRepository } from '@/services/repositories';
import type { UpdateUserInfoEntity } from "@/services/domain/entities";
import { toast } from 'react-toastify';

export function useUpdateProfile() {
  const { user, setUser } = useAuthContext();
  const [processing, setProcessing] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState<UpdateUserInfoEntity>({
    id: user?.id || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      country: user?.address?.country || ''
    },
    currentPassword: '',
    newPassword: ''
  });

  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          country: user.address?.country || ''
        },
        currentPassword: '',
        newPassword: ''
      });
    }
  }, [user]);

  const textValidation = useCallback(({ text, fieldName, name }: { text: string, fieldName: string, name: string }) => {
    if (!text || text.trim() === '') {
      setError(prev => ({ ...prev, [fieldName]: `${name} is required` }));
      return false;
    }
    if (text.length < 2) {
      setError(prev => ({ ...prev, [fieldName]: `${name} must be at least 2 characters` }));
      return false;
    }
    if (text.length > 50) {
      setError(prev => ({ ...prev, [fieldName]: `${name} must be less than 50 characters` }));
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(text)) {
      setError(prev => ({ ...prev, [fieldName]: `${name} must contain only letters` }));
      return false;
    }
    setError(prev => ({ ...prev, [fieldName]: '' }));
    return true;
  }, []);

  const passwordValidation = useCallback(({ password, fieldName, name }: { password: string, fieldName: string, name: string }) => {
    if (!password || password.trim() === '') {
      setError(prev => ({ ...prev, [fieldName]: `${name} is required` }));
      return false;
    }
    if (password.length < 6) {
      setError(prev => ({ ...prev, [fieldName]: `${name} must be at least 6 characters` }));
      return false;
    }
    if (password.length > 20) {
      setError(prev => ({ ...prev, [fieldName]: `${name} must be less than 20 characters` }));
      return false;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
      setError(prev => ({ ...prev, [fieldName]: `${name} must contain at least one uppercase letter, one lowercase letter, and one number` }));
      return false;
    }
    setError(prev => ({ ...prev, [fieldName]: '' }));
    return true;
  }, []);

  const emailValidation = useCallback((email: string) => {
    if (!email || email.trim() === '') {
      setError(prev => ({ ...prev, email: 'Email is required' }));
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(prev => ({ ...prev, email: 'Invalid email format' }));
      return false;
    }
    setError(prev => ({ ...prev, email: '' }));
    return true;
  }, []);

  const clearErrors = useCallback(() => {
    setError({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  }, []);

  const validation = useCallback(() => {
    clearErrors();

    const isFirstNameValid = textValidation({ text: form.firstName || '', fieldName: 'firstName', name: 'First Name' });
    const isLastNameValid = textValidation({ text: form.lastName || '', fieldName: 'lastName', name: 'Last Name' });
    const isEmailValid = emailValidation(form.email || '');

    let isPasswordValid = true;
    if (form.currentPassword || form.newPassword) {
      isPasswordValid = passwordValidation({
        password: form.newPassword || '',
        fieldName: 'newPassword',
        name: 'New Password'
      });

      if ((form.newPassword || '').trim() !== confirmPassword.trim()) {
        setError(prev => ({
          ...prev,
          confirmNewPassword: 'New password and confirm password do not match'
        }));
        isPasswordValid = false;
      } else {
        setError(prev => ({ ...prev, confirmNewPassword: '' }));
      }
    }

    return isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid;
  }, [form, confirmPassword, textValidation, passwordValidation, emailValidation, clearErrors]);

  const handleUpdateProfile = useCallback(async () => {
    setProcessing(true);

    const isValid = validation();
    if (!isValid) {
      toast.error('Please fix validation errors');
      setProcessing(false);
      return;
    }

    try {
      await new AuthRepository().updateUserInfo(form);
      toast.success('Profile updated successfully');

      setUser({
        ...user,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email
      });

      setConfirmPassword('');
      setIsSuccess(true);
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setProcessing(false);
    }
  }, [form, user, setUser, validation]);

  const handleCancel = useCallback(() => {
    if (!user) return;
    setForm({
      id: user?.id || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        country: user?.address?.country || ''
      },
      currentPassword: '',
      newPassword: ''
    });
    setConfirmPassword('');
    clearErrors();
  }, [user, clearErrors]);

  return {
    form,
    setForm,
    confirmPassword,
    setConfirmPassword,
    processing,
    handleUpdateProfile,
    handleCancel,
    error,
    isSuccess,
    setError
  };
}

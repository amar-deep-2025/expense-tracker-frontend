export const validationRegister = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  } else if (formData.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\+91\d{10}$/.test(formData.phone)) {
    errors.phone = "Enter a valid phone number";
  }

  return errors;
};
export const validationOtp = (formData) => {
  const errors = {};

  if (!formData.otp.trim()) {
    errors.otp = "OTP is required";
  } else if (!/^\d{6}$/.test(formData.otp)) {
    errors.otp = "OTP must be 6 digits";
  }

  return errors;
};

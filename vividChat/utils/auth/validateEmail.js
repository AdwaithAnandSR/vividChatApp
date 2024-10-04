const validateEmail = ({email, setMessage}) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setMessage({
      message: "invalid email formate!",
      styles: "text-red-500"
    });
    return false;
  }
  return true;
};

export default validateEmail;

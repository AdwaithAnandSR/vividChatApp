export const validateSignupFields = ({ email, username, password, setMessage }) => {
  if (
    email?.trim().length < 5 ||
    username.trim().length < 5 ||
    password.trim().length < 5
  ) {
    setMessage({
      message: "all fields must have atleast 5 charecters!",
      styles: "text-red-500"
    });
    return false;
  } else return true;
};

export const validateSigninFields = ({ username, password, setMessage }) => {
  if (
    
    username.trim().length < 5 ||
    password.trim().length < 5
  ) {
    setMessage({
      message: "all fields must have atleast 5 charecters!",
      styles: "text-red-500"
    });
    return false;
  } else return true;
};

const handleSignup = async ({ formData, setMessage }) => {
  const { email, username, password } = formData;
  if (!validateFields({ email, username, password })) return;
  if (!validateEmail(email)) return;

  const res = await signUp({ username, email, password });
  if (res === true) router.replace("(tabs)");
  else
    setMessage({
      message: res.data.message,
      styles: "text-red-500"
    });
};

export default handleSignup;

import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { validateSigninFields } from "./validateFields.js";

const SERVER_API = Constants.expoConfig.extra.serverApi;

const handleLogin = async ({ formData, setMessage }) => {
  setMessage({
    message: "please wait...",
    styles: "text-green-500"
  });
  const { email, username, password } = formData;
  if (!validateSigninFields({ username, password, setMessage })) return;

  try {
    const res = await axios.post(`${SERVER_API}/auth/signin`, {
      username,
      password
    });

    if (res.status === 200 && res.data.success === true) {
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("username", res.data.username);
      await AsyncStorage.setItem("userId", res.data.userId);
      setMessage({
        message: "login successfull",
        styles: "text-green-500"
      });
      router.replace("(tabs)");
      return;
    } else if (res.data.status === 400 && res.data.message) {
      setMessage({
        message: res.data.message,
        styles: "text-red-500"
      });
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

export default handleLogin;

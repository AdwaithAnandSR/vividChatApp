import { View, Text, TouchableOpacity } from "react-native";

import InputField from "../../components/auth/InputField.jsx";
import SubmitButton from "../../components/auth/SubmitButton.jsx";

import handleSignup from "../../utils/auth/handleSignup.js";

const SignUp = ({ handleInputChange, formData, message, setIsNew, setMessage }) => (
  <View className='h-full w-full bg-zinc-900 px-2 pt-[8vh]'>
    <Text className='text-white font-black text-white text-4xl my-[5vh] text-center'>
      SignUp
    </Text>
    <InputField
      title={"username: "}
      placeholder={"create unique username"}
      value={formData.username}
      onChangeText={str => handleInputChange("username", str)}
      extraStyles={"mb-4"}
    />
    <InputField
      title={"email: "}
      placeholder={"enter email"}
      value={formData.email}
      onChangeText={str => handleInputChange("email", str)}
      extraStyles={"mb-4"}
    />
    <InputField
      title={"password: "}
      placeholder={"enter password"}
      value={formData.password}
      onChangeText={str => handleInputChange("password", str)}
    />

    <View className='flex items-center my-3'>
      <Text className={`${message.styles}`}>{message.message}</Text>
    </View>
    <SubmitButton title={"SignUp"} onSubmit={handleSignup({ formData, setMessage })} />

    <TouchableOpacity
      onPress={() => setIsNew(prev => false)}
      className='flex-row justify-center items-center mt-10'>
      <Text className='text-[3.85vw] text-zinc-400'>
        Already have an account ?{"  "}
        <Text className='font-black text-white text-[4vw]'>SignIn.</Text>
      </Text>
    </TouchableOpacity>
  </View>
);

export default SignUp;

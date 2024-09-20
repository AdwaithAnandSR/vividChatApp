import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import InputField from "../../components/auth/InputField.jsx";
import SubmitButton from "../../components/auth/SubmitButton.jsx";

import signIn from "../../controller/auth/signIn.js";

const SignIn = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: ""
	});

	const [message, setMessage] = useState({
		message: "",
		styles: ""
	});

	const handleInputChange = useCallback(
		(field, value) =>
			setFormData({
				...formData,
				[field]:
					field === "username"
						? value.toLowerCase().replace(/\s+/g, "")
						: value
			}),
		[formData]
	);

	const validateFields = ({ username, password }) => {
		if (username.trim().length < 5 || password.trim().length < 5) {
			setMessage({
				message: "all fields must have atleast 5 charecters!",
				styles: "text-red-500"
			});
			return false;
		} else return true;
	};

	const handleSubmit = async () => {
		const { email, username, password } = formData;
		if (!validateFields({ username, password })) return;

		const res = await signIn({ username, email, password });
		if (res === true) router.push("(tabs)");
		else
			setMessage({
				message: res.data.message,
				styles: "text-red-500"
			});
	};

	return (
		<SafeAreaView>
			<View className="h-full w-full bg-zinc-900 px-2 pt-[8vh]">
				<Text className="text-white font-black text-white text-4xl my-[5vh] text-center">
					SignIn
				</Text>
				<InputField
					title={"username: "}
					placeholder={"create unique username"}
					value={formData.username}
					onChangeText={str => handleInputChange("username", str)}
					extraStyles={"mb-4"}
				/>
				<InputField
					title={"password: "}
					placeholder={"enter password"}
					value={formData.password}
					onChangeText={str => handleInputChange("password", str)}
				/>

				<View className="flex items-center my-7">
					<Text className={`${message.styles}`}>{message.message}</Text>
				</View>

				<SubmitButton title={"SignUp"} onSubmit={handleSubmit} />

				<Text className="text-white text-center mt-4 text-[3.1vw] text-zinc-400">
					Already have an account ?{"  "}
					<Text className="font-black text-white">
						<Link href="(auth)/SignUp">SignIn.</Link>
					</Text>
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default SignIn;

import { useEffect, memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";
import Toast from "react-native-toast-message";

import Navbar from "../../components/settings/Navbar.jsx";

const SERVER_URL = Constants.expoConfig.extra.serverApi;

const Account = () => {
	const handleLogout = async () => {
		const userId = await AsyncStorage.getItem("userId");
		if (userId) {
			//axios.post(`${SERVER_URL}/auth/signout`, { userId });
		}
		await AsyncStorage.clear();
		Toast.show({
			type: "success",
			text1: "Logout successfull.",
			position: "bottom",
			swipeable: true
		});
		router.replace("(auth)/Auth");
	};

	return (
		<SafeAreaView className="w-full h-full bg-zinc-950">
			<Navbar title="Account" />
			<TouchableOpacity
				onPress={handleLogout}
				className="mx-auto mt-10 w-[60vw] h-[6vh] bg-red-500 rounded-3xl flex justify-center items-center">
				<Text className="font-pblack text-white text-xl">Logout</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default Account;

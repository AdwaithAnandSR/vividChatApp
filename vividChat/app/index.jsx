import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { enableScreens } from "react-native-screens";

import checkHealth from "../utils/serverHealthCheck.js";

SplashScreen.preventAutoHideAsync();
enableScreens();
export default function Index() {
   const [message, setMessage] = useState(null)
   
	const [fontLoaded, error] = useFonts({
		"poppins-black": require("../assets/fonts/Poppins-Black.ttf"),
		"poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
		"poppins-medium": require("../assets/fonts/Poppins-Medium.ttf"),
		"poppins-thin": require("../assets/fonts/Poppins-Thin.ttf"),
		"roboto-black": require("../assets/fonts/Roboto-Black.ttf"),
		"roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
		"roboto-medium": require("../assets/fonts/Roboto-Medium.ttf"),
		"roboto-regular": require("../assets/fonts/Roboto-Regular.ttf"),
		"jacquesFrancoisShadow-regular": require("../assets/fonts/JacquesFrancoisShadow-Regular.ttf"),
		"nerkoOne-regular": require("../assets/fonts/NerkoOne-Regular.ttf")
	});

	useEffect(() => {
		async function prepareApp() {
			if (fontLoaded && !error) {
				await SplashScreen.hideAsync();
				initApp();
			}
		}
		prepareApp();
	}, [fontLoaded, error]);

	if (!fontLoaded && !error) return null;

	const initApp = async (retryCount = 0) => {
		try {
			const SERVER_API = Constants.expoConfig.extra.serverApi;
			const serverStatus = await checkHealth(SERVER_API);
			const userId = await AsyncStorage.getItem("userId");
			if (serverStatus === 200) {
				if (userId) router.replace("(tabs)");
				else router.replace("(auth)/SignIn");
			}
		} catch (e) {
			if (retryCount < 10) {
			   setMessage(`Retrying... (${retryCount + 1}) : 10`)
				setTimeout(() => initApp(retryCount + 1), 10000);
			} else {
				setMessage("retry limit exceeded.");
			}
		}
	};

	return (
		<View className="h-full w-full bg-zinc-900 flex justify-center items-center ">
			<Text className="text-white pt-5 font-black text-[16vw]">
				vividChat
			</Text>
			
			<Text className="text-red-500 pt-5 font-black text-[3.85vw]">
				{message}
			</Text>
			
		</View>
	);
}

import { useState, useEffect, memo } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";

import Navbar from "../../components/settings/Navbar.jsx";
import ConfirmMessage from "../../components/settings/ConfirmMessage.jsx";
import ProfileEditableItem from "../../components/settings/ProfileEditableItem.jsx";

import setChatWallpaper from "../../controller/settings/setChatWallpaper.js";

const Chat = () => {
	const [wallpaper, setWallpaper] = useState(null);

	useEffect(() => {
		const fetch = async () => {
			const res = await AsyncStorage.getItem("chatWallpaper");
			setWallpaper(res);
		};
		fetch();
	}, []);

	return (
		<SafeAreaView className="w-full h-full bg-zinc-950">
			<Navbar title="Chats settings" />
			<View className="w-full h-[30%] border bg-[#06100edb] rounded-2xl p-3 mt-5">
				<Image
					className="w-full h-full"
					contentFit={"contain"}
					source={
						wallpaper
							? {
									uri: wallpaper
							  }
							: require("../../assets/images/VIVIDCHAT_LOGO.png")
					}
				/>

				<View className="w-screen h-full flex justify-center items-center absolute">
					<TouchableOpacity
						onPress={()=> setChatWallpaper(setWallpaper)}
						activeOpacity={0.6}
						className="w-[45vw] h-[6vh] border-white border rounded-xl mt-10 flex justify-center items-center bg-[#000000df]">
						<Text className="font-pmedium text-[4vw] text-white tracking-wide">
							change
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Chat;

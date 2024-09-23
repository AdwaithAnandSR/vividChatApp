import { memo } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Navbar = ({ chatPartnerUsername }) => {
	return (
		<View className="flex-row items-center w-full h-[8vh] bg-zinc-950">
			<TouchableOpacity
				onPress={() => router.back()}
				className="w-10 h-10 flex justify-center items-center rounded-full">
				<Ionicons name="chevron-back" size={24} color="white" />
			</TouchableOpacity>
			<View className="w-[5.5vh] h-[5.5vh] rounded-full overflow-hidden mr-2">
				<Image
					className="w-full h-full"
					source={require("../../assets/images/default-avatar.jpg")}
					contentFit="cover"
					placeholder={{ blurhash }}
					transition={800}
				/>
			</View>
			<Text className="font-pbold text-[4.5vw] text-white tracking-tighter">
				{chatPartnerUsername}
			</Text>
		</View>
	);
};

export default memo(Navbar)
import { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ChatItem = ({ item }) => {
   const navigation = useNavigation();


	const handlePress = () => {
		const id = item._id;
		const username = item.username;

		if (id && username) {
			navigation.push(`others/[id]`, {
				id,
				username,
			});
		}
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			className="h-[8vh] my-[0.35vh] flex-row items-center justify-around">
			<View className="w-[5.5vh] h-[5.5vh] rounded-full overflow-hidden mx-3">
				<Image
					className="w-full h-full"
					source={require("../../assets/images/default-avatar.jpg")}
					contentFit="cover"
					placeholder={{ blurhash }}
					transition={500}
				/>
			</View>
			<View className="flex gap-1 w-[80%]">
				<Text className="text-white font-rblack tracking-tight capitalize text-[4vw]">
					{item.username}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ChatItem;

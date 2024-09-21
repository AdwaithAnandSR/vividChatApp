import { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ChatItem = ({ item, isPressDisabled, setIsPressDisabled }) => {
	const [userId, setUserId] = useState(null);
	const [itemPressDisabled, setItemPressDisabled] = useState(false); // Individual press control
	const navigation = useNavigation();

	useEffect(() => {
		const fetchUserId = async () => {
			let id = await AsyncStorage.getItem("userId");
			setUserId(id);
		};
		fetchUserId();
	}, []);

	const handlePress = () => {
		if (itemPressDisabled || isPressDisabled) return;

		setIsPressDisabled(true);  // Disabling global press
		setItemPressDisabled(true);  // Disabling individual press

		// Navigate to the other user's profile
		if (userId && item.participants.user1.userId === userId) {
			const id = item.participants.user2.userId;
			const username = item.participants.user2.username;
			navigation.push(`chat/[id]`, { id, username });
		} else {
			const username = item.participants.user1.username;
			const id = item.participants.user1.userId;
			navigation.push(`chat/[id]`, { id, username });
		}

		// Timeout for re-enabling both presses after 2 seconds
		setTimeout(() => {
			setIsPressDisabled(false);
			setItemPressDisabled(false); // Re-enable individual item press
		}, 2000);
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			disabled={itemPressDisabled || isPressDisabled} 
			className="h-[8vh] my-[0.35vh] flex-row items-center">
			<View className="w-[5.5vh] h-[5.5vh] rounded-full overflow-hidden mx-3">
				<Image
					className="w-full h-full"
					source={require("../../assets/images/default-avatar.jpg")}
					contentFit="cover"
					placeholder={{ blurhash }}
					transition={500}
				/>
			</View>
			<View className="flex gap-1 w-[75%]">
				<Text className="text-white font-rblack tracking-tight capitalize text-[4vw]">
					{userId === item.participants.user1.userId
						? item.participants.user2.username
						: item.participants.user1.username}
				</Text>

				<View className="flex-row">
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						className="text-zinc-300 text-[3vw] mr-1">
						{item.lastMessage.message}
					</Text>
					{item.lastMessage.sender === userId ? (
						item.lastMessage.status === "sent" ? (
							<AntDesign name="check" size={11} color="white" />
						) : item.lastMessage.status === "delivered" ? (
							<Ionicons
								name="checkmark-done-outline"
								size={12}
								color="white"
							/>
						) : (
							<Ionicons
								name="checkmark-done-sharp"
								size={12}
								color="rgb(59, 130, 246)"
							/>
						)
					) : null}
				</View>
			</View>
			{item.lastMessage.sender !== userId &&
			item.lastMessage.status != "read" ? (
				<View className="w-3 h-3 bg-green-500 rounded-full absolute right-3 flex justify-center items-center">
					<Text className="text-red-400 text-[4vw]">{""}</Text>
				</View>
			) : null}
		</TouchableOpacity>
	);
};

export default ChatItem;
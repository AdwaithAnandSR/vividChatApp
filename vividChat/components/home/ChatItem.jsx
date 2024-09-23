import { useEffect, useState, memo, useCallback } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

import formateTime from "../../utils/formateTime.js";

const ChatItem = memo(({ item, isPressDisabled }) => {
	const [userId, setUserId] = useState(null);
	const [partner, setPartner] = useState(null);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchUserData = async () => {
			const id = await AsyncStorage.getItem("userId");
			setUserId(id);
		};
		fetchUserData();
	}, []);

	useEffect(() => {
		if (!item || !userId) return;
		setPartner(
			item.participants.user1._id === userId
				? item.participants.user2
				: item.participants.user1
		);
	}, [item, userId]);

	const handlePress = useCallback(() => {
		const id = partner._id;
		const username = partner.username;
		navigation.push(`chat/[id]`, { id, username });
	}, [partner, navigation]);

	const formattedTime = useMemo(
		() => formateTime(item.lastMessage.createdAt),
		[item.lastMessage.createdAt]
	);

	const renderMessageStatusIcon = useCallback(() => {
		if (item.lastMessage.sender === userId) {
			switch (item.lastMessage.status) {
				case "sent":
					return <AntDesign name="check" size={11} color="white" />;
				case "delivered":
					return (
						<Ionicons
							name="checkmark-done-outline"
							size={12}
							color="white"
						/>
					);
				case "read":
					return (
						<Ionicons
							name="checkmark-done-sharp"
							size={12}
							color="rgb(59, 130, 246)"
						/>
					);
				default:
					return null;
			}
		}
		return null;
	}, [item.lastMessage, userId]);

	if (!partner) return null;

	return (
		<TouchableOpacity
			onPress={handlePress}
			disabled={isPressDisabled}
			className="h-[8vh] my-[0.35vh] flex-row items-center">
			<View className="w-[5.5vh] h-[5.5vh] rounded-full overflow-hidden mx-3">
				<Image
					className="w-full h-full"
					source={
						partner.avatar
							? { uri: partner.avatar }
							: require("../../assets/images/default-avatar.jpg")
					}
					contentFit="cover"
					placeholder={{ blurhash }}
					transition={500}
				/>
			</View>
			<View className="flex gap-1 w-[75%]">
				<View className="w-screen flex-row ">
					<Text className="text-white font-rblack tracking-tight capitalize text-[4vw]">
						{partner.username}
					</Text>
					<Text className="text-white font-rblack tracking-tight capitalize text-[4vw]">
						{formattedTime}
					</Text>
				</View>
				<View className="flex-row">
					{renderMessageStatusIcon()}
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						className="text-zinc-300 text-[3vw] ml-1">
						{item.lastMessage.message}
					</Text>
				</View>
			</View>
			{/* Display unread message indicator */}
			{item.lastMessage.sender !== userId &&
			item.lastMessage.status !== "read" ? (
				<View className="w-3 h-3 bg-green-500 rounded-full absolute right-3 flex justify-center items-center">
					<Text className="text-red-400 text-[4vw]">{""}</Text>
				</View>
			) : null}
		</TouchableOpacity>
	);
});

export default ChatItem;

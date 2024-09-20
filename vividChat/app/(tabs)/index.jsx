import { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";


import Navbar from "../../components/home/Navbar.jsx";
import ChatList from "../../components/home/ChatList.jsx";

import { ChatContext } from "../../contexts/chatListContext.js";
import useGetChatList from "../../hooks/home/useGetChatList.js";
import useReceiveMessage from '../../hooks/home/useReceiveMessage.js';

const Chat = () => {
	const { chatList, setChatList } = useContext(ChatContext);
	const { loading } = useGetChatList({ setChatList });
   useReceiveMessage();
   
	return (
		<SafeAreaView className="flex-1 bg-zinc-950">
			<Navbar title="vividChat" />
			<View className="flex-1 relative">
				{loading ? (
					<Text className=" text-white text-center">Loading...</Text>
				) : (
					<ChatList chatList={chatList} />
				)}
				<TouchableOpacity
					onPress={() => router.push("others/AllUsers")}
					className="flex justify-center items-center w-[13vw] h-[13vw] bg-green-500 rounded-lg absolute top-[73%] left-[78%]">
					<Ionicons name="person-add-outline" size={22} color="white" />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Chat;

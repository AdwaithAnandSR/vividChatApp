import { useEffect, useState, memo } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import useSendMessage from "../../hooks/chat/useSendMessage.js";

const Bottom = ({ chatId, userId, chatPartnerId, setMessages, chatPartnerUsername, username }) => {
	const [message, setMessage] = useState(null);
	const [parseMessage, setParseMessage] = useState(null);

	useSendMessage({ parseMessage, setParseMessage, chatId, userId, chatPartnerId, setMessages, chatPartnerUsername, username });

	const handleSendMessage = () => {
	   if(message.trim() === "") return;
		setParseMessage(message);
		setMessage("");
	};
	return (
		<View   className="bg-[#09090bcc] fixed w-full min-h-[8vh] max-h-[11vh] flex-row justify-between items-center px-1">
			<TextInput
				multiline={true}
				value={message}
				onChangeText={txt => setMessage(txt)}
				placeholder="message"
				placeholderTextColor="white"
				className="bg-zinc-600 text-[4vw] text-white w-[85%] rounded-2xl px-3 ml-1 py-1"
				allowFontScaling={false}
			/>
			<TouchableOpacity
				onPress={handleSendMessage}
				className="w-[10vw] h-[10vw] bg-green-600 rounded-full mr-2 flex justify-center items-center">
				<Ionicons name="send" size={18} color="white" />
			</TouchableOpacity>
		</View>
	);
};

export default memo(Bottom);

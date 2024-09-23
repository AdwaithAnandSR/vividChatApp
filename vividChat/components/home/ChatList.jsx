import { useState, memo } from "react";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import ChatItem from "./ChatItem.jsx";

const ChatList = ({ chatList }) => {
	const [isPressDisabled, setIsPressDisabled] = useState(false);
	return (
		<FlashList
			data={chatList}
			renderItem={({ item }) => (
				<ChatItem item={item} isPressDisabled={isPressDisabled} setIsPressDisabled={setIsPressDisabled} />
			)}
			estimatedItemSize={200}
			ListEmptyComponent={() => (
				<View className="mt-3 flex justify-center items-center">
					<Text className="text-white">No chats to show.</Text>
				</View>
			)}
		/>
	);
};

export default ChatList;

import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import ChatItem from './ChatItem.jsx';

const ChatList = ({ chatList }) => (
	<FlashList
		data={chatList}
		renderItem={({ item }) => <ChatItem item={item} lastMessageNeeded={true} />}
		estimatedItemSize={200}
		ListEmptyComponent={() => (
			<View className="mt-3 flex justify-center items-center">
				<Text className="text-white">No chats to show.</Text>
			</View>
		)}
	/>
);

export default ChatList;

import React, { memo } from "react";
import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";
import ChatItem from "./ChatItem.jsx"; 

const AllUsersList = React.memo(({ allUsers, itemHeight, userId }) => {
	return (
		<FlashList
			data={allUsers}
			renderItem={({ item }) => <ChatItem userId={userId} item={item} />}
			estimatedItemSize={itemHeight}
			ListEmptyComponent={() => (
				<View className="mt-3 flex justify-center items-center">
					<Text className="text-white text-center">
						No more users available yet.{"\n"}You are the one first to
						VividChat💖
					</Text>
				</View>
			)}
		/>
	);
});

export default AllUsersList;
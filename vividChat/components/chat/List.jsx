import React, { useCallback } from "react";
import { View, FlatList, Text } from "react-native";

import RenderItem from "./RenderItem.jsx";

const List = ({ data, onLoadMore, userId, chatLoading, hasMore }) => {
	const renderFooter = useCallback(() => {
		if (!chatLoading && !hasMore) {
			return (
				<Text className="text-zinc-300 mt-2 text-center">no more chats.</Text>
			);
		}
		return null;
	}, [chatLoading, hasMore]);
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => <RenderItem userId={userId} item={item} />}
			keyExtractor={item => item._id}
			onEndReached={() => {
				onLoadMore();
			}}
			onEndReachedThreshold={2}
			initialNumToRender={10}
			scrollEventThrottle={20}
			ListFooterComponent={renderFooter}
			inverted
		/>
	);
};

export default List;

import React, { memo, useCallback } from "react";
import { FlatList, Text } from "react-native";
import RenderItem from "./RenderItem.jsx";

const List = ({ data, onLoadMore, userId, chatLoading, hasMore }) => {
	const renderItem = useCallback(
		({ item }) => <RenderItem userId={userId} item={item} />,
		[userId]
	);

	const handleLoadMore = useCallback(() => {
		if (!chatLoading && hasMore) {
			onLoadMore();
		}
	}, [chatLoading, hasMore, onLoadMore]);

	const renderFooter = useCallback(() => {
		if (!hasMore && !chatLoading) {
			return <Text className="text-white mt-2 text-center">no more chats.</Text>;
		}
		return null;
	}, [hasMore, chatLoading]);

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={item => item._id}
			onEndReached={handleLoadMore}
			onEndReachedThreshold={0.5}
			ListFooterComponent={renderFooter}
			initialNumToRender={10}
			maxToRenderPerBatch={10}
			windowSize={7}
			inverted
		/>
	);
};

export default memo(List);

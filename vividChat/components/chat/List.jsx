import React, { memo, useCallback } from "react";
import { FlatList, Text } from "react-native";
import RenderItem from "./RenderItem.jsx";

const List = ({ data, onLoadMore, userId, chatLoading, hasMore }) => {
	const renderItem = useCallback(
		({ item }) => <RenderItem userId={userId} item={item} />,
		[userId]
	);

	const renderFooter = useCallback(() => {
		if (!hasMore && !chatLoading) {
			return (
				<Text className="text-white mt-2 text-center">no more chats.</Text>
			);
		}
		return null;
	}, [hasMore, chatLoading]);

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={item => item._id}
			onEndReached={onLoadMore}
			onEndReachedThreshold={0.5}
			ListFooterComponent={renderFooter}
			removeClippedSubviews={true}
			initialNumToRender={10}
			maxToRenderPerBatch={15}
			windowSize={15}
			inverted
		/>
	);
};

export default memo(List);

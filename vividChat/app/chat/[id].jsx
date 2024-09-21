import { useEffect, useState, useCallback, useContext } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import debounce from "lodash/debounce";

import Navbar from "../../components/chat/Navbar.jsx";
import Bottom from "../../components/chat/Bottom.jsx";
import List from "../../components/chat/List.jsx";

import generateChatId from "../../utils/generateChatId.js";
import useGetMessages from "../../hooks/chat/useGetMessages.js";
import useReceiveMessage from "../../hooks/chat/useReceiveMessage.js";
import useReadMessages from "../../hooks/chat/useReadMessages.js";


const FETCH_LIMIT = 25;
const Chat = () => {
	const { id: chatPartnerId, username: chatPartnerUsername } =
		useGlobalSearchParams();
	const [userId, setUserId] = useState(null);
	const [username, setUsername] = useState(null);
	const [chatId, setChatId] = useState(null);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const handleFetch = async () => {
			const [id, name] = await Promise.all([
				AsyncStorage.getItem("userId"),
				AsyncStorage.getItem("username")
			]);
			setUserId(id);
			setUsername(name);
		};
		handleFetch();
	}, []);

	useEffect(() => {
		if (!chatPartnerId || !userId) return;
		const handleFetch = async () => {
			const id = await generateChatId({ userId, chatPartnerId });
			setChatId(id);
		};
		handleFetch();
	}, [chatPartnerId, userId]);

	

	const { loading: chatLoading } = useGetMessages({
		chatId,
		page,
		limit: FETCH_LIMIT,
		setMessages,
		setHasMore
	});

	useReceiveMessage({ chatId, setMessages });

	useReadMessages({ chatId, setMessages, userId, chatPartnerId });

	const onLoadMore = useCallback(
		debounce(() => {
			if (hasMore) {
				setPage(prev => prev + 1);
			}
		}, 500),
		[hasMore]
	);

	return (
		<SafeAreaView className="w-full h-full bg-zinc-950">
			<Navbar chatPartnerUsername={chatPartnerUsername} />
			<View className="flex-1">
				<List
					data={messages}
					onLoadMore={onLoadMore}
					userId={userId}
					chatLoading={chatLoading}
					hasMore={hasMore}
				/>
			</View>
			<Bottom
				chatId={chatId}
				userId={userId}
				chatPartnerId={chatPartnerId}
				chatPartnerUsername={chatPartnerUsername}
				username={username}
				setMessages={setMessages}
			/>
		</SafeAreaView>
	);
};

export default Chat;

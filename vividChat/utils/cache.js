import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveChatListToCache = async (chatId, newChats) => {
	try {
		const cachedData = await AsyncStorage.getItem(`chatList-${chatId}`);
		let existingChats = [];

		if (cachedData !== null) {
			const { chats, timestamp } = JSON.parse(cachedData);
			if (Date.now() - timestamp < 48 * 60 * 60 * 1000) {
				existingChats = chats;
			} else {
				await AsyncStorage.removeItem(`chatList-${chatId}`);
			}
		}

		const combinedChats = [...newChats, ...existingChats];
		const uniqueChats = Array.from(
			new Set(combinedChats.map(chat => chat.chatId))
		).map(id => combinedChats.find(chat => chat.chatId === id));

		const cacheData = {
			chats: uniqueChats,
			timestamp: Date.now()
		};

		await AsyncStorage.setItem(
			`chatList-${chatId}`,
			JSON.stringify(cacheData)
		);
	} catch (e) {
		console.error("Failed to save chat list to cache", e);
	}
};

export const loadAllChatListsFromCache = async () => {
	try {
		const allKeys = await AsyncStorage.getAllKeys();
		const chatListKeys = allKeys?.filter(key => key.startsWith("chatList-"));

		const chatLists = await Promise.all(
			chatListKeys.map(async key => {
				const cachedData = await AsyncStorage.getItem(key);
				return cachedData ? JSON.parse(cachedData) : null;
			})
		);

		return chatLists?.filter(list => list !== null);
	} catch (e) {
		console.error("Failed to load all chat lists from cache", e);
		return [];
	}
};

export const saveMessagesToCache = async (chatId, newMessages) => {
	try {
		const [userId1, userId2] = chatId.split("_");
		await AsyncStorage.removeItem(`chatMessages-${chatId}`);
		return
		const cachedData = await AsyncStorage.getItem(`chatMessages-${chatId}`);
		let existingMessages = [];

		if (cachedData !== null) {
			const { messages, timestamp } = JSON.parse(cachedData);
			if (Date.now() - timestamp < 48 * 60 * 60 * 1000) {
				existingMessages = messages;
			} else {
				await AsyncStorage.removeItem(`chatMessages-${chatId}`);
			}
		}

		// Filter new messages to only include those from the correct chat participants
		const filteredNewMessages = newMessages
			.filter(item => {
				return (
					(item.sender === userId1 && item.receiver === userId2) ||
					(item.sender === userId2 && item.receiver === userId1)
				);
			})
			.map(item => ({
				...item,
				isCached: false // Mark as original data
			}));

		// Add isCached property to existing messages
		const existingMessagesWithCacheFlag = existingMessages.map(item => ({
			...item,
			isCached: true 
		}));

		const combinedMessages = [
			...filteredNewMessages,
			...existingMessagesWithCacheFlag
		];

		const uniqueMessages = Array.from(
			new Set(combinedMessages.map(message => message._id))
		).map(id => combinedMessages.find(msg => msg._id === id));

		const cacheData = {
			messages: uniqueMessages,
			timestamp: Date.now()
		};

		await AsyncStorage.setItem(
			`chatMessages-${chatId}`,
			JSON.stringify(cacheData)
		);
	} catch (e) {
		console.error("Failed to save messages to cache", e);
	}
};

export const loadMessagesFromCache = async chatId => {
	try {
		const [userId1, userId2] = chatId.split("_");
		const cachedData = await AsyncStorage.getItem(`chatMessages-${chatId}`);

		if (cachedData !== null) {
			const { messages, timestamp } = JSON.parse(cachedData);

			if (Date.now() - timestamp < 48 * 60 * 60 * 1000) {
				const filteredMessages = messages.filter(item => {
					return (
						(item.sender === userId1 && item.receiver === userId2) ||
						(item.sender === userId2 && item.receiver === userId1)
					);
				});
				const sortedMessages = filteredMessages.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);

				return sortedMessages;
			} else {
				await AsyncStorage.removeItem(`chatMessages-${chatId}`);
			}
		}
		return [];
	} catch (e) {
		console.error("Failed to load messages from cache", e);
		return [];
	}
};

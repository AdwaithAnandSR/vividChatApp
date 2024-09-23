import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveMessagesToCache = async (chatId, newMessages) => {
	try {
		const [userId1, userId2] = chatId.split("_");
		const cachedData = await AsyncStorage.getItem(`chatMessages-${chatId}`);
		let existingMessages = [];

		if (cachedData !== null) {
			const { messages, timestamp } = JSON.parse(cachedData);
			if (Date.now() - timestamp < 48 * 60 * 60 * 1000) {
			   if(Date.now() - timestamp < 60 * 60 * 1000){
			      if(messages.length >50){
			         messages.splice(0, messages.length - 50)
			      }
			   }
				existingMessages = messages;
			} else {
				await AsyncStorage.removeItem(`chatMessages-${chatId}`);
			}
		}

		const filteredNewMessages = newMessages
			.filter(item => {
				return (
					(item.sender === userId1 && item.receiver === userId2) ||
					(item.sender === userId2 && item.receiver === userId1)
				);
			})
			.map(item => ({
				...item,
				isCached: true 
			}));

		
		const combinedMessages = [
			...filteredNewMessages,
			...existingMessages
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

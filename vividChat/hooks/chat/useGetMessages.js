import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/socketContext.js";
import {
	saveMessagesToCache,
	loadMessagesFromCache
} from "../../utils/cache.js";

const useGetMessages = ({ chatId, page, limit, setMessages, setHasMore }) => {
	const socket = useContext(SocketContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!socket || !chatId || !page || !limit || !setHasMore || !setMessages)
			return;
      setLoading(true)
		const fetchCachedMessages = async () => {
			const cachedMessages = await loadMessagesFromCache(chatId);
			if (cachedMessages.length > 0) {
			   setLoading(false)
				setMessages(cachedMessages);
			}
		};

		const handleResponse = newChats => {
			setLoading(false);
			if (newChats) {
				setMessages(prev => {
					const mergedMessages = [...prev, ...newChats.messages];
					const uniqueMessages = Array.from(
						new Set(mergedMessages.map(message => message._id))
					).map(id => mergedMessages.find(msg => msg._id === id));
					return uniqueMessages;
				});
				setHasMore(newChats.messages.length === limit);
				saveMessagesToCache(chatId, newChats.messages);
			}
		};

		setLoading(true);
		fetchCachedMessages(); 

		socket.emit("getChatMessages", { chatId, page, limit });
		socket.on("getChatMessagesResponse", handleResponse);

		return () => {
			socket.off("getChatMessagesResponse", handleResponse);
		};
	}, [socket, chatId, page, limit, setMessages, setHasMore]);

	return { loading };
};

export default useGetMessages;

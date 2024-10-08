import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/socketContext.js";
import { ChatContext } from "../../contexts/chatListContext.js";

import {
	saveMessagesToCache,
	loadMessagesFromCache
} from "../../utils/chatCache.js";

const useGetMessages = ({
	chatId,
	page,
	limit,
	setMessages,
	setHasMore,
	userId
}) => {
	const socket = useContext(SocketContext);
	const [loading, setLoading] = useState(true);
	const { setChatList, chatList } = useContext(ChatContext);

	useEffect(() => {
		if (!socket || !chatId || !page || !limit || !setHasMore || !setMessages)
			return;
		setLoading(true);
		const fetchCachedMessages = async () => {
			const cachedMessages = await loadMessagesFromCache(chatId);
			if (cachedMessages.length > 0) {
				setLoading(false);
				setMessages(cachedMessages);
			}
		};

		const handleResponse = newChats => {
			setLoading(false);
			if (newChats) {
				setMessages(prev => {
					const mergedMessages = [...newChats.messages, ...prev];
					const uniqueMessages = Array.from(
						new Set(mergedMessages.map(message => message._id))
					).map(id => mergedMessages.find(msg => msg._id === id));
					return uniqueMessages;
				});
				if (setChatList && userId) {
					setChatList(prev =>
						prev?.map(item =>
							item.chatId === chatId &&
							item.lastMessage.sender !== userId
								? {
										...item,
										lastMessage: {
											...item.lastMessage,
											status: "read"
										}
								  }
								: item
						)
					);
				}
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
	}, [socket, chatId, page, limit]); //setMessages setHaemore ... if any bugs found then try adding these to dependency array.

	return { loading };
};

export default useGetMessages;

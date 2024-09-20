import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/socketContext.js";

const useGetMessages = ({ chatId, page, limit, setMessages, setHasMore }) => {
	const socket = useContext(SocketContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!socket || !chatId || !page || !limit || !setHasMore || !setMessages) return;
		setLoading(true);
		const handleResponse = newChats => {
			setLoading(false);
			if (newChats) {
			   setMessages(prev=> [...prev, ...newChats.messages])
			   if(newChats.messages.length < limit) setHasMore(false)
			}
		};

		socket.emit("getChatMessages", { chatId, page, limit });
		socket.on("getChatMessagesResponse", handleResponse);
		
		return () => {
			socket.off("getChatMessagesResponse", handleResponse);
		};
	}, [socket, chatId, page, limit, setMessages, setHasMore]);
	
	return { loading } ;
};

export default useGetMessages;

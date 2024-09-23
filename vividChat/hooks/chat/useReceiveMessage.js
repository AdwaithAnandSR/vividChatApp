import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../contexts/socketContext.js";
import { ChatContext } from "../../contexts/chatListContext.js";

const useReceiveMessage = ({ chatId, setMessages, userId, chatPartnerId }) => {
	const socket = useContext(SocketContext);
	const { chatList, setChatList } = useContext(ChatContext);

	useEffect(() => {
		if (!socket || !chatId || !setMessages) return;
		const handleReceive = chat => {
			if (chat.chatId != chatId) return;
			setMessages(prev => [chat.messages[0], ...prev]);
			setChatList(prev => {
				const index = prev.findIndex(item => item.chatId === chatId);
				if (index >= 0) {
					prev[index].lastMessage.status = "read";
				}
				return [...prev]; 
			});
			if (userId && chatPartnerId)
				socket.emit("messageSeened", { chatId, userId, chatPartnerId });
		};

		socket.on("receiveMessage", handleReceive);
		return () => {
			socket.off("receiveMessage", handleReceive);
		};
	}, [socket, chatId, setMessages]);
};

export default useReceiveMessage;

import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../contexts/socketContext.js";

const useReceiveMessage = ({ chatId, setMessages }) => {
	const socket = useContext(SocketContext);
	
	useEffect(() => {
		if (!socket || !chatId || !setMessages ) return;
		const handleReceive = chat => {
			if (chat.chatId != chatId) return;
			setMessages(prev => [chat.messages[0], ...prev]);
		};

		socket.on("receiveMessage", handleReceive);
		return () => {
			socket.off("receiveMessage", handleReceive);
		};
	}, [socket, chatId, setMessages]);
	
	
	
};

export default useReceiveMessage;
import { useEffect, useContext } from "react";

import { SocketContext } from "../../contexts/socketContext.js";

const useReadMessages = ({ userId, setChatList }) => {
	const socket = useContext(SocketContext);
	useEffect(() => {
		if (!socket || !setChatList || !userId) return;

		const handleResponse = resChatId => {
			setChatList(prev => {
				index = prev.findIndex(item => item.chatId === resChatId);
				if (index > 0) {
					if (prev[index].lastMessage.sender === userId)
						prev[index].lastMessage.status = "read";
				}
				return [...prev];
			});
		};

		socket.on("messageSeened", handleResponse);
		return () => {
			socket.off("messageSeened", handleResponse);
		};
	}, [socket]);
};

export default useReadMessages;

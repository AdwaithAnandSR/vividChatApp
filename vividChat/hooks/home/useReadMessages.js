import { useEffect, useContext } from "react";

import { SocketContext } from "../../contexts/socketContext.js";

const useReadMessages = ({ userId, setChatList }) => {
	const socket = useContext(SocketContext);
	useEffect(() => {
		if (!socket || !setChatList || !userId) return;
		
		const handleResponse = resChatId => {
			setChatList(prev =>
				prev?.map(item =>
					item.chatId === resChatId && item.lastMessage.sender === userId
						? {
								...item,
								lastMessage: { ...item.lastMessage, status: "read" }
						  }
						: item
				)
			);
		};

		socket.on("messageSeened", handleResponse);
		return () => {
			socket.off("messageSeened", handleResponse);
		};
	}, [socket]);
};

export default useReadMessages;

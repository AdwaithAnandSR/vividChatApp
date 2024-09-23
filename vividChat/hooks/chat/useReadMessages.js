import { useState, useEffect, useContext, useCallback } from "react";

import { SocketContext } from "../../contexts/socketContext.js";
import { ChatContext } from "../../contexts/chatListContext.js";

const useReadMessages = ({ chatId, setMessages, userId, chatPartnerId }) => {
	const { setChatList, chatList } = useContext(ChatContext);
	const socket = useContext(SocketContext);

	useEffect(() => {
		if (
			!socket ||
			!chatId ||
			!setMessages ||
			!setChatList ||
			!userId ||
			!chatPartnerId
		) {
			return;
		}

		const handleResponse = async resChatId => {
			if (resChatId !== chatId) return;
			setMessages(prev => {
				const hasChanges = prev?.some(
					chat => chat.sender === userId && chat.status !== "read"
				);
				if (!hasChanges) return prev;
				return prev?.map(chat =>
					chat.sender === userId && chat.status !== "read"
						? { ...chat, status: "read" }
						: chat
				);
			});

			setChatList(prev =>
				prev?.map(item =>
					item.chatId === chatId && item.lastMessage.sender === userId
						? {
								...item,
								lastMessage: { ...item.lastMessage, status: "read" }
						  }
						: item
				)
			);
		};

		socket.emit("messageSeened", { chatId, userId, chatPartnerId });
		socket.on("messageSeened", handleResponse);

		return () => {
			socket.off("messageSeened", handleResponse);
		};
	}, [socket, chatId, userId, chatPartnerId]);
};

export default useReadMessages;

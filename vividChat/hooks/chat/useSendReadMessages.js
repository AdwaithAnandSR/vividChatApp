import { useState, useEffect, useContext } from "react";

import { SocketContext } from "../../contexts/socketContext.js";
import { ChatContext } from "../../contexts/chatListContext.js";

const useSendReadMessages = ({
	chatId,
	setMessages,
	userId,
	chatPartnerId
}) => {
	const { setChatList, chatList } = useContext(ChatContext);
	const socket = useContext(SocketContext);

	useEffect(() => {
		if (
			!socket ||
			!chatId ||
			!setMessages ||
			!setChatList ||
			!chatList ||
			!userId ||
			!chatPartnerId
		)
			return;

		const handleResponse = resChatId => {
			if (resChatId !== chatId) return;

			setMessages(prev =>
				prev?.map(chat => {
					if (chat.sender === userId && chat.status != "read") {
						return {
							...chat,
							status: "read"
						};
					}
					return chat;
				})
			); //update all messages to read where sender is userId

			setChatList(prev =>
				prev?.map(item =>
					item.chatId === chatId && item.lastMessage.sender === userId
						? {
								...item,
								lastMessage: { ...item.lastMessage, status: "read" }
						  }
						: item
				)
			); //update chatList last message status
		};
		socket.emit("messageSeened", { chatId, userId, chatPartnerId });
		socket.on("messageSeened", handleResponse);
	}, [
		socket,
		chatId,
		setMessages,
		setChatList,
		chatList,
		userId,
		chatPartnerId
	]);
};

export default useSendReadMessages;

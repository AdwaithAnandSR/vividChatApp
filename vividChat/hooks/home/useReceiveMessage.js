import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../contexts/socketContext.js";
import { ChatContext } from "../../contexts/chatListContext.js";

const useReceiveMessage = () => {
	const socket = useContext(SocketContext);
	const { chatList, setChatList } = useContext(ChatContext);

	const handleChatList = ({ chatList, chat, setChatList }) => {

		setChatList(prev => {
			existingIndex = chatList.findIndex(item => item.chatId === chat.chatId);
			newChatDocument = [...chatList];
			if (existingIndex != -1) {
				updatedChat = newChatDocument.splice(existingIndex, 1);
				updatedChat[0].lastMessage = chat.messages[0];
				return [...updatedChat, ...newChatDocument];
			} else {
				chat.lastMessage = chat.messages[0];
				return [chat, ...newChatDocument];
			}
		});
	};

	useEffect(() => {
		if (!socket || !chatList || !setChatList) return;

		const handleReceive = chat => {
			handleChatList({ chatList, chat, setChatList });
			return;
		};

		socket.on("receiveMessage", handleReceive);
		return () => {
			socket.off("receiveMessage", handleReceive);
		};
	}, [socket, chatList, setChatList]);
};

export default useReceiveMessage;

import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/socketContext.js";

import { ChatContext } from "../../contexts/chatListContext.js";
import { saveMessagesToCache } from '../../utils/cache.js';

const handleChatList = ({ setChatList, chatList, chatRes, chatId }) => {
	setChatList(prev=>{
	   existingIndex = chatList?.findIndex(item=> item.chatId === chatId) ;
	   if(chatList && chatList.length>0 )
	      newChatDocument = [...chatList];
	   else newChatDocument = []
	   if(existingIndex != -1){
	      updatedChat = newChatDocument.splice(existingIndex, 1) ;
	      updatedChat[0].lastMessage = chatRes.messages[0];
	      return [...updatedChat, ...newChatDocument];
	   }else{
	      chatRes.lastMessage = chatRes.messages[0];
	      return [chatRes, ...newChatDocument];
	   }
	})
};

const useSendMessage = ({
	parseMessage,
	chatId,
	userId,
	chatPartnerId,
	setParseMessage,
	setMessages,
	chatPartnerUsername,
	username
}) => {
	const socket = useContext(SocketContext);
	const { setChatList, chatList } = useContext(ChatContext);
	useEffect(() => {
		if (
			!socket ||
			!parseMessage ||
			!setParseMessage ||
			!chatId ||
			!userId ||
			!chatPartnerId ||
			!setMessages ||
			!chatPartnerUsername ||
			!username ||
			!chatList ||
			!setChatList
		)
			return;
		const tempId = Date.now();
		const chat = {
			chatId,
			message: parseMessage,
			sender: {
				id: userId,
				username
			},
			receiver: {
				id: chatPartnerId,
				username: chatPartnerUsername
			},
			tempId
		};

		// here the chat object content two objects sender and receiver (for sending both username and id to the server), but in out app the sender and receiver is not objects, its just userid's. so that the bellow setMessages contains an expression, not chat variable.
		const newData={
				chatId,
				_id: tempId,
				message: parseMessage,
				sender: userId,
				receiver: chatPartnerId,
				tempId,
				status: "sent",
				createdAt: Date.now()
			}
		   
		
		setMessages(prev => [
         newData,
			...prev
		]);
		
		saveMessagesToCache(chatId, [newData])

		const handleResponse = ({ chatRes, id }) => {
			setMessages(prev => {
				return prev.map(item => {
					if (item.tempId && item.tempId === id) {
						return { ...item, ...chatRes.messages[0] };
					}
					return item;
				});
			});

			handleChatList({ setChatList, chatList, chatRes, chatId });
		};

		socket.emit("sendMessage", chat);
		socket.on("sendMessageResponse", handleResponse);

		return () => {
			socket.off("sendMessageResponse", handleResponse);
		};
	}, [
		socket,
		parseMessage,
		setParseMessage,
		chatId,
		userId,
		chatPartnerId,
		setMessages,
		chatPartnerUsername,
		username
	]);
};

export default useSendMessage;

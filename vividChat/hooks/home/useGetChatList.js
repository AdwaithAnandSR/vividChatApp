import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/socketContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetChatList = ({ setChatList }) => {
	const [userId, setUserId] = useState(null);
	const [loading, setLoading] = useState(true);
	const socket = useContext(SocketContext);

	useEffect(() => {
		const fetchUserId = async () => {
			const id = await AsyncStorage.getItem("userId");
			setUserId(id);
		};
		fetchUserId();
	}, []);

	useEffect(() => {
		if (!socket || !userId) return;

		const handleResponse = chats => {
			setLoading(false);
			setChatList(chats);
		};

		socket.emit("getUserChats", userId);
		socket.on("getUserChatsResponse", handleResponse);

		return () => {
			socket.off("getUserChatsResponse", handleResponse);
		};
	}, [socket, userId, setChatList]);

	return { loading };
};

export default useGetChatList;

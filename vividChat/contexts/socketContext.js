import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For storing user data
import Constants from 'expo-constants';

const SERVER_URL = Constants.expoConfig.extra.serverApi;

export const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const socketInstance = io(`${SERVER_URL}`, {
			transports: ["websocket"]
		});

		socketInstance.on("connect", async () => {
			try {
				const userId = await AsyncStorage.getItem("userId");
				if (userId) {
					socketInstance.emit("join", { userId });
					console.log('emitted...')
				}
			} catch (error) {
				console.error("Error retrieving user ID:", error);
			}
		});

		setSocket(socketInstance);

		return () => {
			if (socketInstance) {
				socketInstance.disconnect();
			}
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

import { Stack } from "expo-router";
import { View } from "react-native";
import Toast from "react-native-toast-message";

import { SocketProvider } from "../contexts/socketContext.js";
import { ChatProvider } from "../contexts/chatListContext.js";
import { AllUsersProvider } from "../contexts/AllUsersContext.js";
import toastConfig from '../config/toast.config.js';

export default function RootLayout() {
	return (
		<View className="w-full h-full bg-zinc-950">
			<SocketProvider>
				<ChatProvider>
					<AllUsersProvider>
						<Stack screenOptions={{ headerShown: false }}>
							<Stack.Screen name="index" />
							<Stack.Screen name="(auth)" />
							<Stack.Screen name="(tabs)" />
							<Stack.Screen name="others/AllUsers" />
							<Stack.Screen name="settings" />
							<Stack.Screen name="chat/[id]" />
						</Stack>
					</AllUsersProvider>
				</ChatProvider>
			</SocketProvider>
			<Toast config={toastConfig} />
		</View>
	);
}

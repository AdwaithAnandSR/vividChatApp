import { Stack } from "expo-router";
import { SocketProvider } from "../contexts/socketContext.js";
import { ChatProvider } from "../contexts/chatListContext.js";
import { AllUsersProvider } from "../contexts/AllUsersContext.js";
import { View } from 'react-native';

export default function RootLayout() {
	return (
		<View className='w-full h-full bg-zinc-950'>
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
		</View>
	);
}

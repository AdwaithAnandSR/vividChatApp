import { Stack } from "expo-router";
import { View } from "react-native";
import Navbar from "../../components/settings/Navbar.jsx";

const SettingsLayout = () => {
	return (
	   <View className='w-full h-full bg-zinc-950'>
		<Stack screenOptions={{
		   headerShown: false
		}}>
			<Stack.Screen name="Settings" />
			<Stack.Screen name="Profile" />
		</Stack>
	   </View>
	);
};

export default SettingsLayout;

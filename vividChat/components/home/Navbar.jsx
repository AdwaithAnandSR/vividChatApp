import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router'; 

const Navbar = ({ title }) => (
	<View className="flex-row items-center justify-between w-full h-[8vh] bg-transparent">
		<Text className="font-pblack text-xl ml-3 text-white">{title}</Text>
		<View className="px-3">
			<TouchableOpacity className="" onPress={()=> router.push('settings/Settings')}>
				<Ionicons name="settings-outline" size={24} color="white" />
			</TouchableOpacity>
		</View>
	</View>
);

export default Navbar;

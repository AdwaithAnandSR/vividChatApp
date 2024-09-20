import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Navbar = ({ title }) => (
	<View className="flex-row items-center justify-between w-full h-[8vh] bg-transparent">
		<Text className="font-pblack text-xl ml-3 text-white">{title}</Text>
		<View className="px-3">
			<TouchableOpacity className="">
				<Ionicons name="settings-outline" size={24} color="white" />
			</TouchableOpacity>
		</View>
	</View>
);

export default Navbar;

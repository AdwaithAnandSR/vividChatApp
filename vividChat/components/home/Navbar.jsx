import { memo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { debounce } from "lodash";

const Navbar = ({ title }) => {
	const [InActiveSettings, setInActiveSettings] = useState(false);
	const handleOpenSettingsDebounce = debounce(() => {
		setInActiveSettings(false)
	}, 500);
	
	const handleOpenSettings = () => {
	   setInActiveSettings(true)
		router.push("settings/Settings");
		handleOpenSettingsDebounce();
	};


	return (
		<View className="flex-row items-center justify-between w-full h-[8vh] bg-transparent">
			<Text className="font-pblack text-xl ml-3 text-white">{title}</Text>
			<View className="px-3">
				<TouchableOpacity
					className=""
					disabled={InActiveSettings}
					onPress={handleOpenSettings}>
					<Ionicons name="settings-outline" size={24} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default memo(Navbar);

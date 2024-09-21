import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from 'expo-router';

const SettingsListItems = ({ item }) => {
	return (
		<TouchableOpacity onPress={()=> router.push(`settings/${item.title}`)} className="h-[9vh] my-[0vh] flex-row items-center px-4 border border-x-0 rounded-lg border-b-zinc-700">
			<Text className="text-white text-[4.3vw] font-pmedium">{item.title}</Text>
		</TouchableOpacity>
	);
};

export default SettingsListItems;

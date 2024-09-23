import React, { memo } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

import Navbar from "../../components/settings/Navbar.jsx";
import { settingsList } from "../../data/SettingsData.js";
import SettingsListItems from "../../components/settings/SettingsListItems.jsx";

const MemoizedSettingsListItems = memo(SettingsListItems);

const Settings = () => {
	return (
		<SafeAreaView className="bg-zinc-950 h-full">
			<Navbar title={"Settings"} />
			<FlashList
				data={settingsList}
				estimatedItemSize={65}
				keyExtractor={item => item.key}
				renderItem={({ item }) => <MemoizedSettingsListItems item={item} />}
			/>
		</SafeAreaView>
	);
};

export default Settings;

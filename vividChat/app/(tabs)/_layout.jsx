import { Tabs } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { View, Text } from "react-native";
import { Dimensions } from "react-native";
import { enableScreens } from "react-native-screens";

enableScreens();
const { height: screenHeight } = Dimensions.get("window");

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					position: "absolute",
					height: screenHeight < 750 ? 63 : 75
				},
				swipeEnabled: true,
				lazy: false,
				unmountOnBlur: false,
				tabBarBackground: () => (
					<BlurView tint="light" intensity={500} className="absolute" />
				)
			}}>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View className="flex -mt-2 justify-center items-center">
								<FontAwesome5
									style={{
										opacity: focused ? 1 : 0.8
									}}
									name="comment"
									size={screenHeight < 750 ? 20 : 24}
									color="white"
								/>
								<Text
									className="text-white font-rbold"
									style={{
										opacity: focused ? 1 : 0.8,
										fontSize: screenHeight < 750 ? 12 : 15
									}}>
									Chats
								</Text>
							</View>
						);
					}
				}}
			/>
			<Tabs.Screen
				name="Updates"
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View className="flex -mt-2 justify-center items-center">
								<Ionicons
									style={{
										opacity: focused ? 1 : 0.8
									}}
									name="sparkles-outline"
									size={screenHeight < 750 ? 20 : 24}
									color="white"
								/>
								<Text
									className="text-white font-rbold"
									style={{
										opacity: focused ? 1 : 0.8,
										fontSize: screenHeight < 750 ? 12 : 15
									}}>
									Updates
								</Text>
							</View>
						);
					}
				}}
			/>
			<Tabs.Screen
				name="Global"
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View className="flex -mt-2 justify-center items-center">
								<FontAwesome5
									style={{
										opacity: focused ? 1 : 0.8
									}}
									name="user-friends"
									size={screenHeight < 750 ? 18 : 24}
									color="white"
								/>
								<Text
									className="text-white font-rbold"
									style={{
										opacity: focused ? 1 : 0.8,
										fontSize: screenHeight < 750 ? 12 : 15
									}}>
									Global
								</Text>
							</View>
						);
					}
				}}
			/>
		</Tabs>
	);
}

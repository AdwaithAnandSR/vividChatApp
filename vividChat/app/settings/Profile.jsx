import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Navbar from "../../components/settings/Navbar.jsx";
import ProfileDp from "../../components/settings/Profile_dp.jsx";

const Profile = () => {
	const [username, setUsername] = useState(null);
	usernameRef = useRef(null);

	useEffect(() => {
		const handleFetch = async () => {
			const storedUsername = await AsyncStorage.getItem("username");
			setUsername(storedUsername);
		};

		handleFetch();
	}, []);
	
	const handleUserNameEdit = ()=>{
	   
	}

	return (
		<SafeAreaView className="h-full bg-zinc-950">
			<Navbar title={"Profile"} />
			<ProfileDp />
			<View className="flex-row items-center h-[8vh] w-[95%] rounded-lg mx-auto border border-zinc-500 ">
				<TextInput
					defaultValue={username}
					ref={usernameRef}
					editable={false}
					className="rounded-lg w-[90%] h-full text-white font-pbold tracking-tight px-4"
				/>
				<TouchableOpacity
				   onPress={handleUserNameEdit}
					className="w-[5vh] h-[5vh] rounded-full flex justify-center items-center">
					<MaterialIcons name="edit" size={18} color="white" />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Profile;

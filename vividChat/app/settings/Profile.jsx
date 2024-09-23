import React, { useState, useEffect, useRef, memo } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Pressable,
	TextInput,
	Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Navbar from "../../components/settings/Navbar.jsx";
import ProfileDp from "../../components/settings/Profile_dp.jsx";
import ConfirmMessage from "../../components/settings/ConfirmMessage.jsx";
import ProfileEditableItem from "../../components/settings/ProfileEditableItem.jsx";

import useUpdateProfile from "../../hooks/settings/useUpdateProfile.js";

const conformMessage = "Are you sure to update ?";

const Profile = () => {
	const [username, setUsername] = useState(null);
	const [userId, setUserId] = useState(null);
	const [about, setAbout] = useState(null);
	const [newName, setNewName] = useState(null);
	const [newAbout, setNewAbout] = useState(null);
	const [UsernameEditable, setUsernameEditable] = useState(false);
	const [isAboutEditable, setIsAboutEditable] = useState(false);
	const [isConfirmShow, setIsConfirmShow] = useState(false);
	const [conformUpdateUsername, setConformUpdateUsername] = useState(false);

	useUpdateProfile({
		userId,
		newName,
		newAbout,
		conformUpdateUsername,
		setConformUpdateUsername,
		username,
		setNewName
	});

	useEffect(() => {
		const handleFetch = async () => {
			const storedUsername = await AsyncStorage.getItem("username");
			const id = await AsyncStorage.getItem("userId");
			const storedAbout = await AsyncStorage.getItem("about");
			setUsername(storedUsername);
			setAbout(storedAbout);
			setUserId(id);
		};
		handleFetch();
	}, []);

	const handleUsernameEdit = () => {
		setNewAbout(null);
		setIsAboutEditable(false);
		setUsernameEditable(prev => {
			prev ? setIsConfirmShow(true) : setIsConfirmShow(false);
			return !prev;
		});
	};
	const handleAboutEdit = () => {
		setNewName(null);
		setUsernameEditable(false);
		setIsAboutEditable(prev => {
			prev ? setIsConfirmShow(true) : setIsConfirmShow(false);
			return !prev;
		});
	};

	const handleSave = () => {
		if (newName !== username || newAbout !== about) {
			if (newName?.length > 5) {
				setConformUpdateUsername(true);
			} else if (newAbout?.length > 0) {
				setConformUpdateUsername(true);
			}
		}
	};

	return (
		<SafeAreaView className="h-full bg-zinc-950">
			<Navbar title={"Profile"} />
			<ProfileDp userId={userId} />

			<ProfileEditableItem
				defaultValue={username}
				isEditable={UsernameEditable}
				onChange={setNewName}
				value={newName}
				type={'username'}
				handlePressEdit={handleUsernameEdit}
			/>
			<ProfileEditableItem
				defaultValue={about}
				placeholder={"vivid_user🥳"}
				type={'about'}
				onChange={setNewAbout}
				value={newAbout}
				isEditable={isAboutEditable}
				handlePressEdit={handleAboutEdit}
			/>

			<ConfirmMessage
				message={conformMessage}
				isVisible={isConfirmShow}
				setIsVisible={setIsConfirmShow}
				handleSave={handleSave}
			/>
		</SafeAreaView>
	);
};

export default memo(Profile);

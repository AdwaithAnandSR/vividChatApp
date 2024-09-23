import { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { SocketContext } from "../../contexts/socketContext.js";
import { Text, View } from "react-native";

const useUpdateProfile = ({
	userId,
	newName,
	newAbout,
	conformUpdateUsername,
	setConformUpdateUsername,
	username,
	setNewName
}) => {
	const socket = useContext(SocketContext);

	useEffect(() => {
		if (!socket || !userId || !setConformUpdateUsername) return;

		if (conformUpdateUsername) {
			if (newName) socket.emit("updateUsername", { userId, newName });
			if (newAbout) {
			   socket.emit("updateAbout", { userId, newAbout });
			   const setAbout = async ()=>{
			      await AsyncStorage.setItem("about", newAbout);
			      Toast.show({
					type: "success",
					text1: "New vibes, new you✨",
					text2: "Your new 'About' section is live!.",
					position: "bottom",
					swipeable: true,
				});
			   }
			   setAbout()
			}
		}

		const handleUpdateUsername = async ({ success, user }) => {
			if (success) {
				await AsyncStorage.setItem("username", user.username);
			}else{
			   Toast.show({
					type: "updateFail",
					text1: "Update Failed: Username already exists.",
					position: "bottom",
					swipeable: true,
				});
				setNewName(username)
			}
		};

		socket.on("updateUsernameRes", handleUpdateUsername);

		setConformUpdateUsername(false);
		return () => {
			socket.off("updateUsernameRes", handleUpdateUsername);
		};
	}, [conformUpdateUsername, socket]);
};

export default useUpdateProfile;

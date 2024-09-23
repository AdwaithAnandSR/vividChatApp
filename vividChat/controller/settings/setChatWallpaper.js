import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const setChatWallpaper = async setWallpaper => {
	try {
		const permissionStatus =
			await ImagePicker.getMediaLibraryPermissionsAsync();
		if (!permissionStatus.granted && permissionStatus.canAskAgain) {
			const requestStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (!requestStatus.granted) {
				Toast.show({
					type: "updateFail",
					text1: "unable to get permission!",
					position: "bottom",
					swipeable: true
				});
				return;
			}
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1.91, 1],
			legacy: true,
			
		});

		if (!result.canceled) {
			const type = result.assets[0].type;
			if (type != "image") {
				return Toast.show({
					type: "updateFail",
					text1: `type ${type} not supported!`,
					position: "bottom",
					swipeable: true
				});
			}
			const fileName = result.assets[0].fileName;
			const mimeType = result.assets[0].mimeType;
			const uri = result.assets[0].uri;

			const existItem = await AsyncStorage.getItem("chatWallpaper");

			const destination = FileSystem.documentDirectory + fileName;
			await FileSystem.copyAsync({
				from: uri,
				to: destination
			});
			await AsyncStorage.setItem("chatWallpaper", destination);
			setWallpaper(destination);
			if (existItem) await FileSystem.deleteAsync(existItem);
		}
	} catch (error) {
		throw new Error(error);
	}
};

export default setChatWallpaper;

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Constants from "expo-constants";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SERVER_URL = Constants.expoConfig.extra.serverApi;

const filePick = async ({
	multipleSelection = false,
	allowsEditing = false,
	route,
	userId,
	setAvatar
}) => {
	const res = await ImagePicker.requestMediaLibraryPermissionsAsync();
	if (!res.granted)
		Toast.show({
			type: "fail",
			text1: "permission: failed to grant permission to access storage.",
			position: "bottom",
			swipeable: true
		});

	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsMultipleSelection: multipleSelection,
		presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
		allowsEditing: allowsEditing,
		aspect: [1, 1],
		quality: 1,
		legacy: true
	});
	if (!result.canceled) {
		Toast.show({
			type: "success",
			text1: "uploading...",
			position: "bottom",
			swipeable: true
		});
		const mime = result.assets[0].mimeType;
		const formData = new FormData();
		formData.append("image", {
			uri: result.assets[0].uri,
			name: result.assets[0].fileName,
			type: mime
		});

		formData.append("userId", userId);

		try {
			if (!SERVER_URL || !route || !formData) return;

			const res = await axios.post(
				`${SERVER_URL}/firebase/uploadDp`,
				formData,
				{
					headers: {
						"Content-type": "multipart/form-data"
					}
				}
			);

			if (res.status) {
				const existAvatar = await AsyncStorage.getItem("avatar");
				const desUrl =
					FileSystem.documentDirectory + result.assets[0].fileName;
				await FileSystem.copyAsync({
					from: result.assets[0].uri,
					to: desUrl
				});
				if (existAvatar) await FileSystem.deleteAsync(existAvatar);
				await AsyncStorage.setItem("avatar", desUrl);
				setAvatar(desUrl);
				Toast.show({
					type: "success",
					text1: "Avatar updated successfully.",
					position: "bottom",
					swipeable: true
				});
			}
		} catch (err) {
			throw new Error(err);
		}
	}
};

export default filePick;

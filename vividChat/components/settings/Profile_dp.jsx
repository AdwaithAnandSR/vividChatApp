import { memo, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

import imagePicker from "../../controller/settings/uploadAvatar.js";

const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Profile_dp = ({ userId }) => {
	const [avatar, setAvatar] = useState(null);
	useEffect(() => {
		fetchAvatar = async () => {
			const res = await AsyncStorage.getItem("avatar");
			setAvatar(res);
		};
		fetchAvatar();
	}, []);

	return (
		<View className="w-full h-[30vh] flex justify-center items-center ">
			<View className="w-[20vh] h-[20vh]">
				<View className="w-full h-full rounded-full overflow-hidden">
					<Image
						className="w-full h-full"
						source={
							avatar
								? {
										uri: avatar
								  }
								: require("../../assets/images/default-avatar.jpg")
						}
						contentFit="cover"
						placeholder={{ blurhash }}
						transition={800}
					/>
				</View>
				<TouchableOpacity
					onPress={() =>
						imagePicker({
							allowsEditing: true,
							route: "firebase/uploadDp",
							userId,
							setAvatar
						})
					}
					activeOpacity={0.6}
					className="w-[5.5vh] h-[5.5vh] rounded-full bg-green-500 absolute bottom-1 right-1 flex justify-center items-center">
					<MaterialIcons name="edit" size={18} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default memo(Profile_dp);

import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Profile_dp = () => {
	return (
		<View className="w-full h-[30vh] flex justify-center items-center ">
			<View className="w-[20vh] h-[20vh]">
				<View className="w-full h-full rounded-full overflow-hidden">
					<Image
						className="w-full h-full"
						source={require("../../assets/images/default-avatar.jpg")}
						contentFit="cover"
						placeholder={{ blurhash }}
						transition={800}
					/>
				</View>
				<TouchableOpacity
					activeOpacity={0.6}
					className="w-[5vh] h-[5vh] rounded-full bg-green-500 absolute bottom-0 right-3 flex justify-center items-center">
					<MaterialIcons name="edit" size={18} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Profile_dp;

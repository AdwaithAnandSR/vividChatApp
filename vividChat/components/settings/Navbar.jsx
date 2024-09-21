import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router'; 

const Navbar = ({ title }) => {
	return (
		<View className='w-full h-[7vh] flex-row items-center mt-2'>
			<TouchableOpacity className="mx-1 mb-1 w-7 h-7 rounded-full flex justify-center items-center" onPress={()=> router.back()}>
				<Ionicons name="chevron-back" size={20} color="white" />
			</TouchableOpacity>
			<Text className='text-white font-pbold text-[4.5vw]'>{title}</Text>
		</View>
	);
};

export default Navbar;

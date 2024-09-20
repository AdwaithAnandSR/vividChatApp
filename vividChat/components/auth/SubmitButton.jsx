import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const SubmitButton = ({
	title,
	onSubmit,
	extraStyles
}) => {
	return (
		<View className='w-full h-[6vh] flex-row justify-center' >
		<TouchableOpacity className='w-[80%] h-full border rounded-lg bg-green-500 justify-center items-center' onPress={onSubmit} activeOpacity={0.8} >
        <Text className='text-white font-black'>{title}</Text>
      </TouchableOpacity>
      </View>
	);
};

export default SubmitButton;

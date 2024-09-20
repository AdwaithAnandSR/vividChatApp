import { View, Text, TextInput } from "react-native";

const InputField = ({
	title,
	placeholder,
	value,
	onChangeText,
	extraStyles
}) => {
	return (
		<View className={`${extraStyles}`}>
			<Text className="text-white text-[5vw] mr-3">
				{title}
			</Text>
			<View className="w-[90%] ml-5 mt-2 h-[6vh] border border-white rounded-lg">
				<TextInput
					className="w-full text-[3.35vw] h-full rounded-lg px-3 text-white"
					placeholder={placeholder}
					placeholderTextColor="grey"
					onChangeText={onChangeText}
					value={value}
				/>
			</View>
		</View>
	);
};

export default InputField;

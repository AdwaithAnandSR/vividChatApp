import { memo } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const ProfileEditableItem = ({ defaultValue, type, placeholder, isEditable, handlePressEdit, onChange, value }) => (
	<View className="flex-row items-center h-[8vh] w-[95%] rounded-lg mx-auto border border-zinc-500 mb-5">
		<TextInput
			defaultValue={defaultValue}
			editable={isEditable}
			multiline={type === 'about'}
			value={type === 'username' ? value?.toLowerCase().replace(/\s+/g, "") : value}
			onChangeText={(str)=> onChange(str) }
			placeholder={placeholder}
			placeholderTextColor={'rgb(63, 63, 70)'}
			className="rounded-lg w-[85%] h-full text-white font-pbold tracking-tight px-4"
		/>
		<TouchableOpacity
			onPress={handlePressEdit}
			className="w-[6vh] h-[6vh] rounded-full flex justify-center items-center">
			{isEditable ? (
				<Ionicons
					name="checkmark-sharp"
					size={18}
					color="rgb(30, 190, 90)"
				/>
			) : (
				<MaterialIcons name="edit" size={18} color="white" />
			)}
		</TouchableOpacity>
	</View>
);

export default memo(ProfileEditableItem);

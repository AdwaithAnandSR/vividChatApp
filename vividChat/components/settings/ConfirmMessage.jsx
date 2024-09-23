import { memo } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const ConfirmMessage = ({
	isVisible,
	message,
	setIsVisible,
	submessage,
	handleSave
}) => (
	<Modal animationType="fade" visible={isVisible} transparent>
		<View className="w-full h-[90%] flex justify-center items-center">
			<View className="py-3 min-h-[25%] w-[95%] rounded-lg bg-zinc-800">
				<Text className="text-white text-center text-[4.5vw] mt-5">
					{message}
				</Text>
				<Text className="text-white text-[2.5vw] opacity-[0.5] text-center mt-2">
					{submessage}
				</Text>
				<View className="my-auto flex-row items-center justify-around">
					<TouchableOpacity onPress={() => setIsVisible(false)}>
						<Text className="text-white border-zinc-700 border rounded-xl px-8 py-3">
							Cancel
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							handleSave();
							setIsVisible(false);
						}}>
						<Text className="text-white px-8 py-3 border rounded-xl border-zinc-700 ">
							Save
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	</Modal>
);

export default memo(ConfirmMessage);

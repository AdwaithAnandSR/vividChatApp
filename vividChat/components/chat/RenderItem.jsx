import React, { memo, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import formateTime from "../../utils/formateTime.js";

const RenderItem = ({ item, userId }) => {
	return (
		<View
			style={{
				alignSelf: item.sender === userId ? "flex-end" : "flex-start"
			}}
			className="py-[1vh] px-2 w-fit my-1">
			<TouchableOpacity className="bg-zinc-800 p-3 pb-1 rounded-lg min-w-[30%] min-h-[6vh] max-w-[85%]">
				<Text className="text-white">{item.message}</Text>
				<View className="self-end mt-2 flex-row items-center">
					<Text className="text-white text-[3vw] font-semibold opacity-[0.85] mx-1">
						{formateTime(item.createdAt)}
					</Text>
					{item.sender === userId ? (
						item.status === "sent" ? (
							<AntDesign name="check" size={11} color="white" />
						) : item.status === "delivered" ? (
							<Ionicons
								name="checkmark-done-outline"
								size={12}
								color="white"
							/>
						) : (
							<Ionicons
								name="checkmark-done-sharp"
								size={12}
								color="rgb(59, 130, 246)"
							/>
						)
					) : null}
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default memo(RenderItem, (prev, next)=> prev._id === next._id);

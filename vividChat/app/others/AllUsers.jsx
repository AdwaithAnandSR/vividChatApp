import React,  { useEffect, useState, useContext, memo, useMemo } from "react";
import { View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AllUsersList from "../../components/others/AllUsersList.jsx";

import { AllUsersContext } from "../../contexts/AllUsersContext.js";
import useGetAllUsers from "../../hooks/others/useGetAllUsers.js";

const { height: screenHeight } = Dimensions.get("window");
const useItemHeight = () => {
		return useMemo(() => {
			return screenHeight * 0.08 + screenHeight * 0.0035;
		}, [screenHeight]);
	};

const AllUsers = memo(() => {
	const [userId, setUserId] = useState(null);
	const FETCH_LIMIT = 10;
   const itemHeight = useItemHeight();

	const { allUsers, setAllUsers, page, setPage } = useContext(AllUsersContext);
	const { loading } = useGetAllUsers({
		page,
		limit: FETCH_LIMIT,
		setPage,
		setAllUsers,
		userId
	});
   
	useEffect(() => {
		const fetchUserId = async () => {
			const id = await AsyncStorage.getItem("userId");
			setUserId(id);
		};
		fetchUserId();
	}, []);

	return (
		<SafeAreaView className="w-full h-full bg-zinc-950">
			<Text className="text-white font-pblack m-4 text-2xl tracking-tight">
				Allusers
			</Text>
			{loading ? (
				<Text className="text-white text-center">Loading...</Text>
			) : (
				<AllUsersList allUsers={allUsers} userId={userId} itemHeight={itemHeight} />
			)}
		</SafeAreaView>
	);
})
export default AllUsers;

import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Navbar from '../../components/home/Navbar.jsx'
const Updates = () => {
	return (
		<SafeAreaView className='w-full h-full bg-zinc-950'>
		   <Navbar title='vividChat' />
			<Text>Updates</Text>
		</SafeAreaView>
	);
};

export default Updates;

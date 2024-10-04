import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleSignUp = async ({ username, email, password }) => {
	const SERVER_API = Constants.expoConfig.extra.serverApi;
	
};

export default handleSignUp;

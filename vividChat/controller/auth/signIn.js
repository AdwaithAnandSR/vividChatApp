import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const handleSignIn = async ({ username, password }) => {
	const SERVER_API = Constants.expoConfig.extra.serverApi;
	try {
		const res = await axios.post(`${SERVER_API}/auth/signin`, {username, password});
		if(res.status === 200 && res.data.success === true){
		   await AsyncStorage.setItem('token', res.data.token);
		   await AsyncStorage.setItem('username', res.data.username);
		   await AsyncStorage.setItem('userId', res.data.userId);
		   return true;
		}
		return res;
	} catch (error) {
		console.log(error);
	}
};

export default handleSignIn;

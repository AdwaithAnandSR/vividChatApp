import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleSignUp = async ({ username, email, password }) => {
	const SERVER_API = Constants.expoConfig.extra.serverApi;
	try {
		const res = await axios.post(`${SERVER_API}/auth/signup`, {username, email, password});
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

export default handleSignUp;

import { BaseToast } from "react-native-toast-message";
const toastConfig = {
	success: ({ text1, text2 }) => (
		<BaseToast
			style={{ borderLeftColor: "#202020", backgroundColor: "#202020", marginBottom: -10}} 
			contentContainerStyle={{ paddingHorizontal: 10 }}
			text1Style={{
				fontSize: 16,
				fontWeight: "bold",
				color: "white",
				textAlign: 'center'
			}}
			text2Style={{
				fontSize: 13,
				textAlign: 'center',
				color: "lightgray"
			}}
			text1={text1}
			text2={text2}
		/>
	),
	updateFail: ({ text1, text2 }) => (
		<BaseToast
			style={{ borderLeftColor: '#1a1919',  backgroundColor: "#1a1919", display: 'flex' }}
			text1Style={{
				fontSize: 13,
				color: "#B00020" ,
				textAlign: 'center'
			}}
			text1={text1}
		/>
	)
};

export default toastConfig;
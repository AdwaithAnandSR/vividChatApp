import { Stack } from "expo-router";
import React, { Suspense, lazy } from "react";

const SignIn = lazy(() => import("./SignIn.jsx"));
const SignUp = lazy(() => import("./SignUp.jsx"));

export default function AuthLayout() {
	return (
		<>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name="SignIn"
					component={() => (
						<Suspense fallback={<Loading />}>
							<SignIn />
						</Suspense>
					)}
				/>
				<Stack.Screen
					name="SignUp"
					component={() => (
						<Suspense fallback={<Loading />}>
							<SignUp />
						</Suspense>
					)}
				/>
			</Stack>
		</>
	);
}

// Example loading component
const Loading = () => (
	<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
		<Text className='text-white'>Loading...</Text>
	</View>
);

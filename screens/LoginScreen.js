import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	useEffect(() => {
		const unSubscribe = auth.onAuthStateChanged((authUser) =>{
			if (authUser) {
				navigation.replace("Home")
			}
		});
		return unSubscribe;
	}, []);
	const signIn = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error.message))
	};
	return(
		<KeyboardAvoidingView
			behavior='padding'
			style={styles.container}
		>
			<StatusBar 
				style="light"
			/>
			<Image
				style={{ 
					width: 200,
					height: 200
				}}
				source={{
					uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
				}} 
			/>
			<View style={styles.inputContainer}>
				<Input 
					placeholder="Email" 
					autoFocus 
					type="email" 
					value={email} 
					onChangeText={(text) => setEmail(text)}
				/>
				<Input 
					placeholder="Password" 
					secureTextEntry 
					type="password" 
					value={password} 
					onChangeText={(text) => setPassword(text)}
					onSubmitEditing={signIn}
				/>
			</View>
			<Button 
				onPress={signIn} 
				containerStyle={styles.button} 
				title='Login' 
			/>
			<Button 
				containerStyle={styles.button} 
				title='Register' 
				type='outline' 
				onPress={() => navigation.navigate('Register')} 
			/>
			<View style={{
				height: 100,
			}} />
		</KeyboardAvoidingView>
	)
}

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		backgroundColor: "white",
	},
	inputContainer: {
		width: 300,
	},
	button: {
		width: 200,
		marginTop: 10,
		
	},
});

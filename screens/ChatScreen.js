import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Platform, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { db, auth } from '../firebase';
import * as firebase from 'firebase';
import { Avatar } from 'react-native-elements';

const ChatScreen = ({ navigation, route }) => {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	useLayoutEffect(() => {
		navigation.setOptions({
			title: route.params.chatName,
			headerBackTitleVisible: false,
			headerStyle: { backgroundColor: "#fff" },
			headerTitleStyle: { color: "black" },
			headerTintColor: "black",
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginLeft: 10 }} 
					onPress={navigation.goBack} 
				>
					<AntDesign 
						name="arrowleft" 
						size={24} 
						color="black" 
					/>
				</TouchableOpacity>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: 80,
						marginRight: 20,
					}}
				>
					<TouchableOpacity>
						<FontAwesome 
							name="video-camera" 
							size={24} 
							color="black" 
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons 
							name="call" 
							size={24} 
							color="black" 
						/>
					</TouchableOpacity>
				</View>
			)
		});
	}, [navigation, route]);
	const sendMessage = () => {
		Keyboard.dismiss();
		db.collection('chats').doc(route.params.id).collection('messages').add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			displayName: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photoURL: auth.currentUser.photoURL
		})
		setInput('')
	}
	useLayoutEffect(() => {
		const unSubscribe = db
			.collection('chats')
			.doc(route.params.id)
			.collection('messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => setMessages(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data()
				}))
			))
			return unSubscribe;
	}, [route])
	return(
		<SafeAreaView 
			style={{
				flex: 1,
				backgroundColor: "white",
			}}
		>
			<StatusBar 
				style="light" 
			/>
			<KeyboardAvoidingView
				behaviour={Platform.OS === 'android' ? "padding" : "height"} 
				style={styles.container} 
				keyboardVerticalOffset={98}
			>
				<TouchableWithoutFeedback 
					onPress={Keyboard.dismiss}
				>
					<>
						<ScrollView
							contentContainerStyle={{
								paddingTop: 15,
							}}
						>
							{messages.map(({id, data}) => (
								data.email === auth.currentUser.email ? (
									<View
										key={id}
										style={styles.reciever}
									>
										<Avatar 
											//IOS or ANDROID
											position="absolute"
											bottom={-15}
											right={-15}
											
											//WEB
											containerStyle={{
												position: "absolute",
												bottom: -15,
												right: -15,
											}}
											
											rounded
											size={30}
											source={{
												uri: data.photoURL,
											}}
										/>
										<Text
											style={styles.recieverText}
										>
											{data.message}
										</Text>
									</View>
								): (
									<View
										key={id}
										style={styles.sender}
									>
										<Avatar 
											//IOS or ANDROID
											position="absolute"
											bottom={-15}
											right={-15}
											
											//WEB
											containerStyle={{
												position: "absolute",
												bottom: -15,
												right: -15,
											}}
											
											rounded
											size={30}
											source={{
												uri: data.photoURL,
											}}
										/>
										<Text
											style={styles.senderText}
										>
											{data.message}
										</Text>
										<Text
											style={styles.senderName}
										>
											{data.displayName}
										</Text>
									</View>
								)
							))}
						</ScrollView>
							<View
								style={styles.footer}
							>
								<TextInput 
									onSubmitEditing={sendMessage}
									placeholder="Message" 
									style={styles.textIput} 
									onChangeText={(text) => setInput(text)} 
									value={input} 
								/>
								<TouchableOpacity
									activeOpacity={0.5}
									onPress={sendMessage}
								>
									<Ionicons 
										name="send"
										size={24}
										color="#2B68E6"
									/>
								</TouchableOpacity>
							</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 15,
	},
	textIput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		backgroundColor: "#ECECEC",
		padding: 10,
		color: "grey",
		borderRadius: 30,
	},
	reciever: {
		padding: 15,
		backgroundColor: "#ECECEC",
		alignSelf: "flex-end",
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: '80%',
		position: 'relative',
	},
	sender: {
		padding: 50,
		backgroundColor: "#2B68E6",
		alignSelf: "flex-start",
		borderRadius: 20,
		margin: 15,
		maxWidth: "80%",
		position: "relative",
	},
	recieverText: {
		color: 'black',
		fontWeight: "500",
		marginLeft: 10,
	},
	senderText: {
		color: "white",
		fontWeight: '500',
		marginLeft: 10,
		marginBottom: 15,
	},
	senderName: {
		left: 10,
		paddingRight: 10,
		fontSize: 10,
		color: 'white',
	},
});

import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {
	const [input, setInput] = useState('');
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Add a new Chat",
			headerBackTitle: "Chats",
			headerStyle: { backgroundColor: "#fff" },
			headerTitleStyle: { color: "black" },
			headerTintColor: "black",
		});
	}, [navigation]);
	const createChat = async () => {
		await db.collection('chats')
			.add({
				chatName: input
			})
			.then(() => {
				navigation.goBack()
			})
			.catch((error) => alert(error.message))
	}
	return(
		<View style={styles.container}>
			<StatusBar 
				style="light"
			/>
			<Input 
				value={input} 
				onSubmitEditing={createChat} 
				onChangeText={(text) => setInput(text)} 
				placeholder="Enter Chat Name" 
				leftIcon={
					<Icon 
						name="wechat" 
						type="antdesign" 
						size={24} 
						color="black" 
					/>
				}
			/>
			<Button 
				disabled={!input}
				onPress={createChat} 
				title="Create new Chat" 
			/>
		</View>
	);
}

export default AddChatScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 30,
		height: "100%",
	},
});

import React, { useLayoutEffect, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../firebase'

const CustomeListItem = ({ id, chatName, enterChat }) => {
	const [chatMessages, setChatMessages] = useState([]);
	useEffect(() => {
		const unSubscribe = db
			.collection('chats')
			.doc(id)
			.collection('messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => (
				setChatMessages(snapshot.docs.map((doc) => doc.data()))
			))
			return unSubscribe;
	})
	return(
		<ListItem 
			key={id} 
			bottomDivider 
			onPress={() => enterChat(id, chatName)} 
		>
			<Avatar
				rounded
				source={{
					uri: "https://st.depositphotos.com/1005920/4409/i/600/depositphotos_44095713-stock-photo-live-chat-icon.jpg"
				}}
			/>
			<ListItem.Content>
				<ListItem.Title
					style={{ fontWeight: "800" }}
				>
					{chatName}
				</ListItem.Title>
				<ListItem.Subtitle
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
}

export default CustomeListItem;

const styles = StyleSheet.create({});

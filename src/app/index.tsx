import { View, Image, StyleSheet } from "react-native";
import { ButtonInitial } from "../Components/ButtonInitial";

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Stack} from 'expo-router';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#000000',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        color: '#000',
    },})

export default function Index() {
  return (

        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Welcome to the Home Screen!</Text>
            <Text>This is the main entry point of the app.</Text>
            <Text>Use the navigation to explore different sections.</Text>
        </View>
        
    )}
        
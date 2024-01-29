import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Button, TextInput, StyleSheet } from 'react-native';


const LoginScreen = ({ onSuccess }) => {
    const login = "hatiko_1945";
    const password = "12345";

    const [loginInput, setLogin] = useState('');
    const [passwordInput, setPassword] = useState(' ')

    const authorization = () => {
        if (loginInput === login && passwordInput === password) {
            onSuccess();
        }
        else {
            alert('Неверный логин или пароль!')
        }
    }

    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput style={styles.input} onChangeText={setLogin} value={loginInput} placeholder="Логин ..."/>
                <TextInput secureTextEntry={true} style={styles.input} onChangeText={setPassword} value={passwordInput} placeholder="Пароль ..."/>
                <Button title="Авторизация" color="blue" onPress={authorization}/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
});


export default LoginScreen;

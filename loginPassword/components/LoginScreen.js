import React, {useEffect, useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';



const LoginScreen = ({ onSuccess }) => {
    const [loginInput, setLogin] = useState('');
    const [passwordInput, setPassword] = useState(' ')

    const authorization = () => {
        fetch(`http://192.168.0.117:3000/accounts/login/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: loginInput,
                password: passwordInput
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    onSuccess();
                } else {
                    alert('Неверный логин или пароль! \nПовторите попытку');
                }
            })
            .catch(err => {console.error('!Авторизация ERROR!', err);})
    }

    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput style={styles.input} onChangeText={setLogin} value={loginInput} placeholder="Логин ..."/>
                <TextInput secureTextEntry={true} style={styles.input} onChangeText={setPassword} value={passwordInput}
                           placeholder="Пароль..."/>
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

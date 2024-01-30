import React, {useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Button, TextInput, StyleSheet} from 'react-native';

const storeUser = async (User) => {
    try {
        await AsyncStorage.setItem("user", JSON.stringify(User))
    } catch (error) {
        console.log("Ошибка: ", error);
    }
}

const LoginScreen = ({ onSuccess }) => {
    const [loginInput, setLogin] = useState('');
    const [passwordInput, setPassword] = useState(' ')

    const authorization = async () => {
        try {
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
                        storeUser(data.success);
                        onSuccess();
                    } else {
                        alert('Неверный логин или пароль! \nПовторите попытку');
                    }
                })
                .catch(err => {
                    console.error('!Авторизация ERROR!', err);
                })
        } catch (error) {
            alert('Сервер не отвечает, повторите попытку позже!')
        }
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

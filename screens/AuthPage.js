import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'



export default function AuthPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)

    const handleAuth = async () => {
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior='padding'>
            <View>
                <Text style={styles.title}>{isLogin ? 'Connexion' : 'Inscription'}</Text>
                <TextInput
                    placeholder='Enter adress email'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    style={styles.input}
                />
                <TextInput
                    placeholder='Enter your pasword'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
            </View>

            <TouchableOpacity onPress={handleAuth} style={styles.button}>
                <Text style={styles.buttonText}>{isLogin ? "Se connecter" : "S'inscrire"}</Text>
            </TouchableOpacity>
            <Text onPress={() => setIsLogin(!isLogin)} style={styles.switch}>
                {isLogin ? "Pas encore inscrit ? Créer un compte" : "Déjà inscrit ? Se connecter"}
            </Text>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,

    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    switch: { marginTop: 10, color: 'blue', textAlign: 'center' },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    KeyboardAvoidingView, Platform, Alert, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';



export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    // cette partie liaison de inscription au giris yap les infos entrer par user 
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate('Home')
            }
        })

    }, [])
    // la partie du giris
    const handleLogin = () => {
        setLoading(true)
        auth.signInWithEmailAndPassword(email, password).then
            ((userCredentials) => {
                const user = userCredentials.user
                //console.log('kullanici giris oldu ', user.email)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false);
                alert(error.message);
            });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <Text style={styles.title}>Connexion</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Se connecter</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('RegisterPage')}
            >
                <Text style={styles.linkText}>Pas encore inscrit ? Créer un compte</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    linkText: {
        color: '#007bff',
        textAlign: 'center',
        marginTop: 20,
    },
});
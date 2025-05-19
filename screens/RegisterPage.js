import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    KeyboardAvoidingView, Platform, Alert, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import RNPickerSelect from 'react-native-picker-select'
import Picker from 'react-native-picker-select';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firebaseApp } from '../firebase'; // si tu l’as exporté ainsi


const izmirDistricts = [
    'Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Çiğli', 'Balçova', 'Gaziemir',
    'Güzelbahçe', 'Karabağlar', 'Bayraklı', 'Menemen', 'Narlıdere', 'Tire',
    'Urla', 'Ödemiş', 'Torbalı', 'Kemalpaşa', 'Aliağa', 'Selçuk', 'Seferihisar'
];


export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [district, setDistrict] = useState('')
    const navigation = useNavigation();


    const handleRegister = () => {

        if (!district) {
            Alert.alert('Error', 'Choose something')
            return
        }

        setLoading(true)
        auth.createUserWithEmailAndPassword(email, password).then
            (userCredentials => {
                const user = userCredentials.user
                // Firestore().collection('users').doc(user.uid).set({
                //     firstName,
                //     lastName,
                //     email,
                //     ville: 'Izmir',
                //     district,
                //     createdAt: Firestore.fieldValue.serverTimestamp()

                // })
                const db = getFirestore(firebaseApp)
                setDoc(doc(collection(db, 'users'), user.uid), {
                    firstName,
                    lastName,
                    email,
                    ville: 'Izmir',
                    district,
                    createdAt: serverTimestamp()
                })
                Alert.alert('Succes', 'Compte cree wit succes', [
                    { text: 'OK', onPress: () => navigation.navigate('AuthPage') }
                ])
                //console.log('Kullanici', user.email);
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Erreur', error.message);
            });

    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <Text style={styles.title}>Créer un compte</Text>

            <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={firstName}
                onChangeText={setFirstName}
            />

            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={lastName}
                onChangeText={setLastName}
            />

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

            <Text style={styles.label}>Ville : İzmir </Text>

            <Text style={styles.label}>Sélectionnez un district :</Text>
            <RNPickerSelect
                onValueChange={(value) => setDistrict(value)}
                placeholder={{ label: 'Choisissez un district', value: null }}
                items={izmirDistricts.map((ilce) => ({
                    label: ilce,
                    value: ilce,
                }))}
                style={pickerSelectStyles}
            />


            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>S'inscrire</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.linkText}>Déjà inscrit ? Se connecter</Text>
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
        backgroundColor: '#28a745',
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
const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        marginBottom: 15,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        marginBottom: 15,
    },
};
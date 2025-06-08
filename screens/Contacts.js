import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native'
import React from 'react'
import { auth, firestore } from '../firebase';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Contacts() {
    const navigation = useNavigation();
    const handlePress = () => {
        auth.signOut();
        navigation.navigate('AuthPage');
    }
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    setError('Utilisateur non connecté');
                    setLoading(false);
                    return;
                }

                const response = await firestore
                    .collection('users')
                    .doc(user.uid)
                    .get();

                //console.log(response.data());

                if (response.exists) {
                    setUserData(response.data());
                } else {
                    setUserData(null);
                }
            } catch (err) {
                setError('Erreur lors du chargement des contacts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>Aucune donnée trouvée</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon Profil</Text>
            <Text style={styles.label}>Prénom : <Text style={styles.value}>{userData.firstName}</Text></Text>
            <Text style={styles.label}>Nom : <Text style={styles.value}>{userData.lastName}</Text></Text>
            <Text style={styles.label}>Email : <Text style={styles.value}>{userData.email}</Text></Text>
            <Text style={styles.label}>Ville : <Text style={styles.value}>{userData.ville}</Text></Text>
            <Text style={styles.label}>District : <Text style={styles.value}>{userData.district}</Text></Text>
            <Button title="Logout" onPress={() => handlePress()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    value: {
        fontWeight: 'normal',
        color: '#555',
    },
});
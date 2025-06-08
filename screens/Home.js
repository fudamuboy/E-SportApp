import { Modal, StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../firebase';
import Annonce from '../components/Annonce';



const Drawer = createDrawerNavigator();

export default function Home() {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [annonces, setAnnonces] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = firestore
            .collection('annonces')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAnnonces(data);
                setLoading(false);
            });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (annonceData) => {
        await firestore().collection('annonces').add({
            ...annonceData,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });
    };

    return (
        <View style={styles.container} >
            <Text>Welcome </Text>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Text>Create an annonce</Text>
            </TouchableOpacity>
            <Annonce isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} onSubmit={handleSubmit} />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : annonces.length === 0 ? (
                <Text style={styles.emptyText}>Aucune annonce pour l'instant.</Text>
            ) : (
                <FlatList
                    data={annonces}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{item.teamName}</Text>
                            <Text>Joueurs : {item.playerNumber}</Text>
                            <Text>Heure : {item.meetingHour}</Text>
                            <Text>Lieu : {item.meetingLocation}</Text>
                        </View>
                    )}
                />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
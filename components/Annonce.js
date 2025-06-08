import {
    Modal, StyleSheet, Text, View, TextInput,
    TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';

export default function Annonce({ isModalVisible, setIsModalVisible, onSubmit }) {
    const [teamName, setTeamName] = useState('');
    const [playerNumber, setPlayerNumber] = useState('');
    const [meetingHour, setMeetingHour] = useState('');
    const [meetingLocation, setMeetingLocation] = useState('');


    const handlePress = () => {
        if (!teamName || !playerNumber || !meetingHour || !meetingLocation) {
            alert("Tous les champs sont requis");
            return;
        }

        const data = {
            teamName,
            playerNumber,
            meetingHour,
            meetingLocation,
        };

        onSubmit(data); // Exécute la fonction fournie par le parent
        setTeamName('');
        setPlayerNumber('');
        setMeetingHour('');
        setMeetingLocation('');
        setIsModalVisible(false);
    };

    return (
        <Modal visible={isModalVisible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Nouvelle Annonce</Text>

                    <TextInput
                        placeholder="Nom de l'équipe"
                        style={styles.input}
                        value={teamName}
                        onChangeText={setTeamName}
                    />
                    <TextInput
                        placeholder="Nombre de joueurs"
                        style={styles.input}
                        keyboardType="numeric"
                        value={playerNumber}
                        onChangeText={setPlayerNumber}
                    />
                    <TextInput
                        placeholder="Heure du match (ex: 18h00)"
                        style={styles.input}
                        value={meetingHour}
                        onChangeText={setMeetingHour}
                    />
                    <TextInput
                        placeholder="Lieu de rendez-vous"
                        style={styles.input}
                        value={meetingLocation}
                        onChangeText={setMeetingLocation}
                    />

                    <TouchableOpacity style={styles.addButton} onPress={handlePress}>
                        <Text style={styles.addButtonText}>Ajouter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                        <Text style={styles.cancelText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '85%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelText: {
        marginTop: 10,
        color: 'red',
        textAlign: 'center',
    },
});

import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { useRouter } from 'expo-router';
import { useSQLiteContext } from "expo-sqlite"; // to access the database

const infoPage = () => {
    const router = useRouter();

    // access the database
    const db = useSQLiteContext();
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

    // fetch user info from the database when the component mounts
    React.useEffect(() => {
        db.getAllAsync("SELECT username, email FROM users LIMIT 1")
            .then((rows) => {
                const typedRows = rows as { username: string; email: string }[];
                if (typedRows.length > 0) {
                    setName(typedRows[0].username);
                    setEmail(typedRows[0].email);
                }
            })
            .catch(err => {
                console.error("Failed to fetch user info:", err);
            });
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Personal Info</Text>
            <Text style={{ marginTop: 10, marginBottom: 10 }}>Name: {name}</Text>
            <Text style={{ marginTop: 10, marginBottom: 30 }}>Email: {email}</Text>
            <View>
                <Text style={styles.card}>Edit Profile</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Button
                    title="Back to Main Screen"
                    onPress={() => router.push("/(tabs)")}
                />
            </View>

           {/* delete profile button */}
            <View style={{ marginTop: 20 }}>
                <Button title="Delete Profile" onPress={() => router.push("/deleteProfile")} />
            </View>

            {/*change password button */}
            <View style={{ marginTop: 20 }}>
                <Button title="Change Password" onPress={() => router.push("/changePassword")} />
            </View>


        </View>

    )
}

export default infoPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    card: {
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 6,
        boxShadow: '5px 5px rgba(0,0,0,0.1)'
    }
})
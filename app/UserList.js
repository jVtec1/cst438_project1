import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react"
import {FlatList, Text, View, ActivityIndicator, RefreshControl } from 'react-native';

//This file/function provides user/dev a list of users in the database, mostly for testing/dev purposes

const UserList = () => {
    const [Users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const db = useSQLiteContext();

    const loadUsers = async () => {
        try{   
            setIsLoading(true);
            const results = await db.getAllAsync(`SELECT * FROM users ORDER BY id DESC`);
            setUsers (results);
        }catch (error) {
            console.error ("Database error", error);
        }finally {
            setIsLoading(false);
        }
    };

    useEffect (() => {
        loadUsers();
    }, []);
    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    return(
        <FlatList
            accessibilityLabel="UserList"
            data= {Users} 
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={loadUsers} tintColor={"#007AFF"}/>
            }
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={{ padding: 10, borderBottomwidth: 1, borderBottomColor:'#ccc' }}>
                    <Text>User: {`${item.username}`}</Text>
                    <Text>Email: {item.email}</Text>
                    <Text>Password: {item.password}</Text>
                </View>
            )}
            ListEmptyComponents={<Text>No Users Found</Text>}
        />
    );
};

export default UserList;
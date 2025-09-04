import {StyleSheet, Text, View, Image} from 'react-native'
const infoPage = () => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Personal Info</Text>
            <Text style ={{marginTop: 10, marginBottom: 30}}>Name:</Text>
            <Text style ={{marginTop: 10, marginBottom: 30}}>Address:</Text>
            <Text style ={{marginTop: 10, marginBottom: 30}}>Credits:</Text>
            <View>
                <Text style = {styles.card}>Edit Profile</Text>
            </View>
        </View>
    )
}

export default infoPage

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    card:{
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 6,
        boxShadow: '5px 5px rgba(0,0,0,0.1)'
    }
})
import { Text, TextInput, View, Button } from "react-native";
import { Stack }from "expo-router";

export default function Index() { // did not rename file to login-page because already routes to index page/first page
  return (
    <> 
    <Stack.Screen options={{title:"Login"}}/> {/* had to access Stack to change title of page from index to Login */}
    <View // wihtout other View (parent), code gets error
    style={{
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
      flex: 0.7
    }}>
      <Text> Login </Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
      
    <Text style={{padding: 10}}> Username: </Text>
    <TextInput placeholder="Enter username" style={{borderWidth: 1}}/>
     
      </View>

      <View
      style={{
        flexDirection: "row",
      }}>
      <Text style={{padding: 10}}> Password: </Text>
      <TextInput placeholder="Enter password" style={{borderWidth: 1}}/>
      </View>

    <Button title="Sign in" onPress={() => console.log("Button check!")}/>

    <Text> Don&apos;t have an account? Click here: </Text>
    <Button title="Sign up" onPress={() => console.log("take user to sign up page!")}/>

    </View>
    </>
  );
}

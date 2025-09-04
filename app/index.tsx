import { Text, TextInput, View, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Index() { // did not rename file to login-page because already routes to index page/first page
  // need to use useState to capture user inputs 
  const [usernameInput, setUsername] = useState(""); 
  const [passwordInput, setPassword] = useState("");
  const [usernameErrorMsg, setUserErrorMsg] = useState("");
  const [passwordErrorMsg, setPassErrorMsg] = useState("");

  const router = useRouter(); // need this router to change pages, e.g.: from login to landing page


  const verifyLogin = () => {
    console.log("Verify login function working!"); 
    if (usernameInput.length < 2) {
      setUserErrorMsg("Username has to be 2 or more characters in length.")
    } else if (usernameInput.length >= 2) {
      setUserErrorMsg("");
    }

    if (passwordInput.length < 3) {
      setPassErrorMsg("Password has to be 3 or more characters in length.")
    } else if (passwordInput.length >= 3) {
      setPassErrorMsg("");
    }

    // error check with database, ensure user is in db and username and password matches
    // use router.push(route-name) here to take user from login to landing page
  };

  const directToSignUp = () => {
    // navigate to the sign up page
  router.push("/sign-up");
  }

  return (
    // <Stack.Screen options={{title:"Login"}}/> {/* had to access Stack to change title of page from index to Login */}
    <View // without other View (parent), code gets error
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
    <TextInput placeholder="Enter username" style={{borderWidth: 1}} value={usernameInput} onChangeText={setUsername}/>
     
    </View>

    <Text style={{color: "red"}}> {usernameErrorMsg} </Text>

      <View
      style={{
        flexDirection: "row",
      }}>
      <Text style={{padding: 10}}> Password: </Text>
      <TextInput placeholder="Enter password" style={{borderWidth: 1}} value={passwordInput} onChangeText={setPassword}/>
      </View>

    <Text style={{color: "red"}}> {passwordErrorMsg} </Text>

    <Button title="Sign in" onPress={verifyLogin}/>

    <Text style={{marginTop: 20}}> Don&apos;t have an account? Click here: </Text>
    <Button title="Sign up" onPress={directToSignUp}/>

    </View>
  );
}

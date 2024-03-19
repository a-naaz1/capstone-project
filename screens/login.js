import React, {useState} from 'react'
import { Image, Text, StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native'
import {app} from "../firebase"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import {Ionicons} from "@expo/vector-icons";


const LoginScreen = ({navigation}) => {
    const [isPasswordShown, setIsPasswordShown]=useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  
    const handleSignIn=async () => {
    const auth =getAuth (app)
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User Signed In successfully!');
        } catch (error) {
        console.error('Error registering user:', error.message);
        }
    };
    onClick = () => {
       // if (password == password && handleSignIn(email,password)==true ){
            handleSignIn(email,password)
            navigation.navigate("Options") 
         
    }


return (
    <KeyboardAvoidingView
        style={styles.container}
        behaviour="padding">  
    <View style={styles.text1}>
    <Text style={styles.titleText}> Login </Text>

    </View>

    <View style={styles.containerImage}>
    <Image
        style={styles.logo}
        source={{uri: 'https://cdn-icons-png.flaticon.com/512/6159/6159086.png'}}/>
    </View>
    <View style={styles.text1}>
    <Text style={styles.optionsText}> Please enter your email and password to Login: </Text>

    </View>

    <View style ={styles.inputContainer}>
    <TextInput
        placeholder="Email"
        value={email}
        onChangeText={value=> setEmail(value) }
        style={styles.input}
    />  
    <TextInput
        placeholder="Password"
        value={password}
        onChangeText={value=> setPassword(value)}
        style={styles.input}
        secureTextEntry={isPasswordShown}
    />

<TouchableOpacity onPress={()=> setIsPasswordShown(!isPasswordShown)}
    style={{
        position:'absolute',
        right: 20,
        paddingTop:67
    }}>
        {
            isPasswordShown==true ? (
                <Ionicons name ="eye-off" size ={24} color ={"black"}/>
            ):(
                <Ionicons name ="eye" size ={24} color ={"black"}/>
            )
        }
    </TouchableOpacity>
    </View>

    <View style={styles.buttonContainer}>
    {/* <TouchableOpacity
        onPress={()=> handleSignIn(email,password)}
        style={styles.button}>
    <Text style={styles.buttonText}> Login </Text>
    </TouchableOpacity> */}

    <TouchableOpacity
        onPress={this.onClick }
        style={styles.button}>
    <Text style={styles.buttonText}> Login </Text>
    </TouchableOpacity>

    

    <View style={styles.differentContainer} >
    <Text style = {styles.optionsText}>Don't have an account? </Text> 
    <Text  onPress={() => navigation.navigate("Register")} style={styles.text}>Register</Text>
    </View>
    </View>
    </KeyboardAvoidingView>
)
}

export default LoginScreen



const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    text1:{
        justifyContent:'flex-end',
    },


    titleText:{
        color: 'black',
        fontWeight:'700',
        fontSize: 35,
    },

    differentContainer:{
        flexDirection:"row"
    },

    text:{ 
        color: 'black',
        fontWeight:'bold',
        fontSize: 15,   
    },

    containerImage: {
        justifyContent: 'center',
        alignItems: 'center',
        padding:30,
      },


    logo: {
        width: 200,
        height: 200,
      },
     
    inputContainer:{
        width: '80%', 
        marginBottom: 20,
    },

    
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical:10,
        borderRadius:10,
        marginTop: 5,
    },


    buttonContainer:{
        width: '60%',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 35,
        
    },


    button:{
        backgroundColor: 'black',
        width: '100%',
        padding:15,
        borderRadius: 10,
        marginBottom: 10,
    },


    buttonOutline:{
        backgroundColor:'white',
        marginTop: 5,
        borderColor: 'black',
        borderWidth:2,
    },


    buttonOutlineText:{
        color: 'black',
        fontWeight:'700',
        fontSize: 16,
        alignText:'center',
    },


    buttonText:{
        color: 'white',
        fontWeight:'700',
        fontSize: 16,
    },
    optionsText:{
        color: 'black',
        fontWeight:'400',
        fontSize: 15,
       
    },
})

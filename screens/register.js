import React, {useState} from 'react'
import { Image, Text, StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {app} from "../firebase"
import {Ionicons} from "@expo/vector-icons";


const RegisterScreen = ({navigation}) => {
const [isPasswordShown, setIsPasswordShown]=useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');  
const [name, setName] = useState('');
const handleSignUp= async () => {
    const auth =getAuth (app)
     try {
         await createUserWithEmailAndPassword(auth, email, password);
         console.log('User registered successfully!');
         } catch (error) {
         console.error('Error registering user:', error.message);
         }
 };

 onClick = () => {
    navigation.navigate("Options") 
    handleSignUp(email,password)
}
return (  
    <KeyboardAvoidingView
        style={styles.container}
        behaviour="padding"
    >
    
    <View style={styles.text1}>
     <Text style={styles.titleText}> Register </Text>
    </View>

    <View style={styles.containerImage}>
    <Image
        style={styles.logo}
        source={{uri: 'https://cdn-icons-png.flaticon.com/512/6159/6159086.png'}}
    />
    </View>
    <Text style={styles.optionsText}> Please enter your name email and password to register: </Text>


    <View style ={styles.inputContainer}>
    
    <TextInput
        placeholder="Name"
        text={name}
        onChangeText={text=> setName(text) }
        style={styles.input}
    />  

    <TextInput
        placeholder="Email"
        text={email}
        onChangeText={text=> setEmail(text) }
        style={styles.input}
    />            
    <TextInput
        placeholder="Password"
        text={password}
        onChangeText={text=> setPassword(text)}
        style={styles.input}
        secureTextEntry={isPasswordShown}
    />

    <TouchableOpacity onPress={()=> setIsPasswordShown(!isPasswordShown)}
    style={{
        position:'absolute',
        right: 20,
        paddingTop: 120,
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
    <TouchableOpacity
        onPress={this.onClick }
        style={[styles.button, styles.buttonOutline]}
    >
    <Text style={styles.buttonOutlineText}> Register </Text>
    </TouchableOpacity>

    <View style={styles.differentContainer}>
    <Text style = {styles.optionsText}>Already have an account? </Text> 
    <Text  onPress={() => navigation.navigate("Login")} style={styles.text}>Login</Text>
    </View>

    {/* <TouchableOpacity
        onPress={() => navigation.navigate("Options")}
        style={[styles.button, styles.buttonOutline]}
    >
    <Text style={styles.buttonOutlineText}> Register </Text>
    </TouchableOpacity> */}

    </View>
    </KeyboardAvoidingView>
)
}
   
export default RegisterScreen
   
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    text1:{
        justifyContent:'flex-end',
        textAlign:'left',
        alignItems:'flex-end',
    },

    differentContainer:{

        flexDirection:"row"
    },

    text:{ 
        color: 'black',
        fontWeight:'bold',
        fontSize: 15,
        
    },

    optionsText:{
        color: 'black',
        fontWeight:'400',
        fontSize: 15,
       
    },


    titleText:{
        color: 'black',
        fontWeight:'700',
        fontSize: 30,
        textAlign: 'left'
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
        width:"100%",
    },


    buttonContainer:{
        width: '60%',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 40,
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
    },


    buttonText:{
        color: 'white',
        fontWeight:'700',
        fontSize: 16,
    },
})

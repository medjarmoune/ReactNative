import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, PermissionsAndroid } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from '../shared/baseUrl'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Permissions from 'expo-permissions';

class LogInTab extends Component {
   
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }
    componentDidMount = async () => {
       await SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({
                        username: userinfo.username,
                        password: userinfo.password,
                        remember: true
                    });
                }
            })
    }
    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
              name='sign-in'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) 
    };
    handleLogin = async () => {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            await SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
            
        else
            await  SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
    }
    render() {
        return (
            <View style={{marginTop:20}}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    secureTextEntry={true}
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        clear
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'blue'
                            />
                        }
                        titleStyle={{
                            color: "blue"
                        }}
                        buttonStyle={{
                            backgroundColor: null,
                            marginTop:20
                        }}
                        />
                </View>
        </View> 
        );
    }
}
class RegisterTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='user-plus'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) 
    };
    
    getImageFromCamera = async () => {
        
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(cameraPermission.status ==='granted' && cameraRollPermission.status === 'granted'){
            let captureImage = await ImagePicker.launchCameraAsync({
                allowsEditing:true,
                aspect:[4, 3],
            });
            if(!captureImage.cancelled){
                console.log(captureImage);
                this.setState({imageUrl: captureImage.uri});
            }
        }

    }
    handleRegister = async() => {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            await SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
    }


    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                        />
                    <View style={{justifyContent:'center',alignItems: 'center'}}>
                        <Button
                            title="Camera"
                            onPress={this.getImageFromCamera}
                            buttonStyle={{backgroundColor:'#9575CD'}}
                        />
                    </View>
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    secureTextEntry={true}
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title="Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
            </View>
            </ScrollView>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        // marginTop:20,
        justifyContent:'center'
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,

    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput:{
        // margin:10
    },
    formCheckbox:{
        // margin:10,
        backgroundColor:null
    },
    formButton:{
        margin:10
    }
})
const Tab = createBottomTabNavigator();

function LogIn() {
    return (
      <Tab.Navigator
        tabBarOptions={{
            activeBackgroundColor: '#9575CD',
            inactiveBackgroundColor: '#D1C4E9',
            activeTintColor: '#ffffff',
            inactiveTintColor: 'gray' 
        }}
      >
        <Tab.Screen name="Log In" component={LogInTab} 
            options={{
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                      name='sign-in'
                      type='font-awesome'            
                      size={24}
                      iconStyle={{ color: tintColor }}
                    />
                  )
            }}
        />
        <Tab.Screen name="Register" component={RegisterTab} 
            options={{
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                    name='user-plus'
                    type='font-awesome'            
                    size={24}
                    iconStyle={{ color: tintColor }}
                    />
                )
            }}
        />
      </Tab.Navigator>
    );
  }
// const LogIn = createBottomTabNavigator({
//     Login: LogInTab,
//     Register: RegisterTab
// }, {
//     tabBarOptions: {
//         activeBackgroundColor: '#9575CD',
//         inactiveBackgroundColor: '#D1C4E9',
//         activeTintColor: '#ffffff',
//         inactiveTintColor: 'gray'
//     }
// });
export default LogIn;


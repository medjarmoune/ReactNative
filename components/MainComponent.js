import React, { Component } from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import Menu from './MenuComponent';
import Dishdetail from './DIshdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';


const MenuNavigator    = createStackNavigator();
const HomeNavigator    = createStackNavigator();
const AboutNavigator   = createStackNavigator();
const ContactNavigator = createStackNavigator();

const MainNavigator    = createDrawerNavigator();

function MenuNavigatorScreen(){
  return(
    <MenuNavigator.Navigator
      initialRouteName = 'Menu'
      screenOptions={{
          headerStyle: {
          backgroundColor: "#512DA8"
        },
          headerTintColor: '#fff',
          headerTitleStyle: {
          color: "#fff"            
        }
      }}
    >
        <MenuNavigator.Screen name='Menu' component={Menu}
          options={
            ({navigation}) => ({
                headerLeft: () => (
                    <Icon 
                        name='menu' 
                        size={24}
                        color='white'
                        onPress={() => 
                            navigation.toggleDrawer()}
                    />
                )
            
            })
         }
        />
        <MenuNavigator.Screen name='Dishdetail' component={Dishdetail} options={{headerTitle:'Dish Detail'}}/>
    </MenuNavigator.Navigator>
  )
}

function HomeNavigatoreScreen () {
  return(
    <HomeNavigator.Navigator
      screenOptions={{
          headerStyle: {
          backgroundColor: "#512DA8"
        },
          headerTintColor: '#fff',
          headerTitleStyle: {
          color: "#fff"            
        }
      }}
    >
        <HomeNavigator.Screen name='Home' component={Home}
          options={
            ({navigation}) => ({
                headerLeft: () => (
                    <Icon 
                        name='menu' 
                        size={24}
                        color='white'
                        onPress={() => 
                            navigation.toggleDrawer()}
                    />
                )
            
            })
         }
        />
    </HomeNavigator.Navigator>
  )
}
function ContactNavigatorScreen () {
  return(
    <ContactNavigator.Navigator
      screenOptions={{
          headerStyle: {
          backgroundColor: "#512DA8"
        },
          headerTintColor: '#fff',
          headerTitleStyle: {
          color: "#fff"            
        }
      }}
    >
      <ContactNavigator.Screen name='Contact Us' component={Contact}
        options={
          ({navigation}) => ({
              headerLeft: () => (
                  <Icon 
                      name='menu' 
                      size={24}
                      color='white'
                      onPress={() => 
                          navigation.toggleDrawer()}
                  />
              )
          
          })
       }
      />
    </ContactNavigator.Navigator>
  )
}
function AboutNavigatorScreen () {
  return(
    <AboutNavigator.Navigator
      screenOptions={{
          headerStyle: {
          backgroundColor: "#512DA8"
        },
          headerTintColor: '#fff',
          headerTitleStyle: {
          color: "#fff"            
        }
      }}
    >
      <AboutNavigator.Screen name='About Us' component={About} 
        options={
          ({navigation}) => ({
              headerLeft: () => (
                  <Icon 
                      name='menu' 
                      size={24}
                      color='white'
                      onPress={() => 
                          navigation.toggleDrawer()}
                  />
              )
          
          })
       }
      />
    </AboutNavigator.Navigator>
  )
}
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
      <View style={styles.drawerHeader}>
          <View style={{flex: 1}}>
              <Image 
                  source={require('./images/logo.png')}
                  style={styles.drawerImage}
              />
          </View>
          <View style={{flex: 2}}>
              <Text style={styles.drawerHeaderText}>
                  Ristorante Con Fusion
              </Text>
          </View>
      </View>
      <DrawerItemList {...props}/>
  </ScrollView>
);
function MainNavigatorDrawer(){
  return(
    <MainNavigator.Navigator 
        initialRouteName="Home"
        drawerStyle={{
            backgroundColor:'#D1C4E9'
        }}
        drawerContent={props => <CustomDrawerContentComponent {...props}/>}
    >
        <MainNavigator.Screen name="Home" component={HomeNavigatoreScreen}
          options={{
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
          }}
        />
        <MainNavigator.Screen name="About Us" component={AboutNavigatorScreen}
          options={{
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
          }}
        />
        <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen} 
          options={{
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
          }}
        />
        <MainNavigator.Screen name="Contact Us" component={ContactNavigatorScreen} 
          
          options={{
            drawerIcon: ({tintColor}) => (
                <Icon 
                    name='address-card'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
          }}
        />
    </MainNavigator.Navigator>
);
}
class Main extends Component {

  render() {
 
    return (
        
        <View style={{flex:1}}>
            <NavigationContainer>
              <MainNavigatorDrawer/>
            </NavigationContainer>
        </View>
        

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
export default Main;
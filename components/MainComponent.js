import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from './MenuComponent';
import Dishdetail from './DIshdetailComponent';
import Home from './HomeComponent';

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

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
        <MenuNavigator.Screen name='Menu' component={Menu} />
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
        <HomeNavigator.Screen name='Home' component={Home} />
    </HomeNavigator.Navigator>
  )
}
function MainNavigatorDrawer(){
  return(
    <MainNavigator.Navigator 
        initialRouteName="Home"
        drawerStyle={{
            backgroundColor:'#D1C4E9'
        }}
    >
        <MainNavigator.Screen name="Home" component={HomeNavigatoreScreen} />
        <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen} />
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
  
export default Main;
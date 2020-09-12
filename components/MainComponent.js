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
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import LogIn from './LogInComponent';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})


const MenuNavigator    = createStackNavigator();
const HomeNavigator    = createStackNavigator();
const AboutNavigator   = createStackNavigator();
const ContactNavigator = createStackNavigator();
const ReserveNavigator = createStackNavigator();
const FavoritesNavigator = createStackNavigator();
const LoginNavigator = createStackNavigator();

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


function FavoritesNavigatoreScreen () {
  return(
    <FavoritesNavigator.Navigator
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
        <FavoritesNavigator.Screen name='My Favorites Dishes' component={Favorites}
          options={
            ({navigation}) => ({
                headerLeft: () => (
                    <Icon 
                        name='menu' 
                        size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                    />
                )
            
            })
         }
        />
    </FavoritesNavigator.Navigator>
  )
}
function LoginNavigatoreScreen () {
  return(
    <LoginNavigator.Navigator
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
        <LoginNavigator.Screen name='Log In' component={LogIn}
          options={
            ({navigation}) => ({
                headerLeft: () => (
                    <Icon 
                        name='menu' 
                        size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                    />
                )
            
            })
         }
        />
    </LoginNavigator.Navigator>
  )
}
function ReserveNavigatoreScreen () {
  return(
    <ReserveNavigator.Navigator
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
        <ReserveNavigator.Screen name='Reserve Table' component={Reservation}
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
    </ReserveNavigator.Navigator>
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
        <MainNavigator.Screen name="Log In" component={LoginNavigatoreScreen}
          options={{
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
          }}
        />
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
        <MainNavigator.Screen name=" My Favorites Dishes" component={FavoritesNavigatoreScreen} 
          options={{
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
          }}
        />
        <MainNavigator.Screen name="Reserve Table" component={ReserveNavigatoreScreen} 
          options={{
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='cutlery'
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
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    console.disableYellowBox = true;
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(Main);
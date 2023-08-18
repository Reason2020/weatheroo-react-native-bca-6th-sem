import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home/Home';
import SelectLocation from './screens/SelectLocation/SelectLocation';
import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/SignUp/SignUp';
import UserProfile from './screens/UserProfile/UserProfile';
import WeeklyForecast from './screens/WeeklyForecast/WeeklyForecast';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='SelectLocation' component={SelectLocation} />
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='WeeklyForecast' component={WeeklyForecast} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

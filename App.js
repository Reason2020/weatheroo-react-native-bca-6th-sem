import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home/Home';
import SelectLocation from './screens/SelectLocation/SelectLocation';
import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/SignUp/SignUp';
import UserProfile from './screens/UserProfile/UserProfile';
import WeeklyForecast from './screens/WeeklyForecast/WeeklyForecast';
import { FIREBASE_AUTH } from './firebaseConfig';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { LocationProvider } from './LocationContext';

const Stack = createNativeStackNavigator();
const LoggedInStack = createNativeStackNavigator();


const SignedInLayout = () => (
  <LoggedInStack.Navigator screenOptions={{ headerShown: false }}>
    <LoggedInStack.Screen name='Home' component={Home} />
    <LoggedInStack.Screen name='UserProfile' component={UserProfile} />
    <LoggedInStack.Screen name='WeeklyForecast' component={WeeklyForecast} />
    <LoggedInStack.Screen name='SelectLocation' component={SelectLocation} />
  </LoggedInStack.Navigator>
)

export default function App() {
  const [ user, setUser ] = useState();

  const auth = FIREBASE_AUTH;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      setUser(user);
    })
  }, [])

  

  return (
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown: false}}>
          { user ? (
            <Stack.Screen name='SignedIn' component={SignedInLayout} />
          ) : (
            <>
              <Stack.Screen name='SignIn' component={SignIn} />
              <Stack.Screen name='SignUp' component={SignUp} />
            </>
          )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}

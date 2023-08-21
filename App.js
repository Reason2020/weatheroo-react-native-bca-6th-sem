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

const Stack = createNativeStackNavigator();

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown: false}}>
        { user ? (
          <>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='UserProfile' component={UserProfile} />
            <Stack.Screen name='WeeklyForecast' component={WeeklyForecast} />
            <Stack.Screen name='SelectLocation' component={SelectLocation} />
          </>
        ) : (
          <>
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='SignUp' component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

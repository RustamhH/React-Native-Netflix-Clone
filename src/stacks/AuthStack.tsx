import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import { useMMKVBoolean } from 'react-native-mmkv';
import { useEffect } from 'react';
import Onboarding from '../screens/onboarding/Onboarding';
const Stack = createNativeStackNavigator()

const AuthStack = () => {

    const [firstTimeUser, setFirstTimeUser] = useMMKVBoolean("firstTimeUser")
    useEffect(() => {
        setFirstTimeUser(true);
    }, [1])


    return (
        <Stack.Navigator>
            {firstTimeUser&&<Stack.Screen name='Onboarding' component={Onboarding}></Stack.Screen>}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

export default AuthStack
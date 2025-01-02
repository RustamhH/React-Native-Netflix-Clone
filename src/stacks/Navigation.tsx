import { NavigationContainer } from '@react-navigation/native';
import { useMMKVString,useMMKVBoolean } from 'react-native-mmkv';
import { useEffect } from "react";
import Onboarding from "../screens/onboarding/Onboarding";
import { View } from 'react-native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import TabStack from './TabStack';

const Navigation = () => {
    const [accessToken, setAccessToken] = useMMKVString('accessToken')
    
    
    

    return (


        <NavigationContainer>
            {accessToken?<TabStack></TabStack>:<AuthStack></AuthStack>}
        </NavigationContainer>
    )

};
  
export default Navigation;


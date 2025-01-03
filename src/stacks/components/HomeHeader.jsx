import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenCast from "../../../assets/icons/screencast.svg"
import Search from "../../../assets/icons/search.svg"
import { useMMKVString } from 'react-native-mmkv'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const HomeHeader = () => {

  const [username]=useMMKVString("username");
  const navigation=useNavigation();
  const { t }=useTranslation();

  return (
    <View className='w-full flex-row justify-between items-center p-2 py-2 bg-black'>
      <Text className='text-white font-extrabold text-3xl'>{t("welcome")} {username}</Text>

      <View className='flex-row items-center gap-4'>
      <TouchableOpacity>
        <ScreenCast/>
      </TouchableOpacity>

      
      <TouchableOpacity onPress={()=>{
        navigation.navigate("Search",{screen:"Screen"})}}>
        <Search/>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeHeader
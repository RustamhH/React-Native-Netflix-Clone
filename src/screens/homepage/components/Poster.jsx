import { useState } from "react"
import { Dimensions, TouchableOpacity } from "react-native"
import { useEffect } from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import { Text } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

const Poster = () => {
  const screenWidth=Dimensions.get("screen").width
  const [visibleShow,setVisibleShow]=useState({})
  const { t }=useTranslation()
  const navigation=useNavigation()

  const getShowData = async() =>{
    try {
      const response = await fetch('http://192.168.100.8:5001/api/v1/tv/trending')
      const data = await response.json()
      setVisibleShow(data.content[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getShowData()
  }, [])


  return (
    
    <View className="w-screen pt-4 px-[27px] relative mb-5">
      <FastImage style={{width:"auto",height:500,backgroundColor:"black"}} source={{
        uri:`https://image.tmdb.org/t/p/original/${visibleShow.poster_path}`,
        priority:FastImage.priority.high
      }}
      resizeMode={FastImage.resizeMode.cover}
      >
      </FastImage>

      <View className="w-full absolute bottom-0 left-[27px] flex-row justify-between items-center p-[14px]">
        <TouchableOpacity className="bg-white w-[48%] py-[10px] rounded-[6px]" onPress={()=>{
      navigation.navigate("Home",{screen:"Details",params:{id:visibleShow.id,type:'tv'}})
    }}>
          <Text className="text-[#191B1E] text-xl font-extrabold text-center">{t("play")}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#2E2B2F] w-[48%] py-[10px] rounded-[6px]">
          <Text className="text-white text-xl font-extrabold text-center">{t("mylist")}</Text>
        </TouchableOpacity>
      </View>

    </View>


  )

}
  
export default Poster
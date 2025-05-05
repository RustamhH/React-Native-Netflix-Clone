import { useState } from "react";
import { FlatList, ImageBackground, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NetflixIcon from "../../../assets/icons/netflix.svg"
import { useMMKVString } from "react-native-mmkv";
import { useTranslation } from "react-i18next";

const Onboarding = () => {



  const [activeIndex,setActiveIndex]=useState(0)
  const [fail,setFail]=useState(false)

  const navigation = useNavigation()
  const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");
  const { t } = useTranslation();


  const onboardingItems = [
    {
        image: require("../../../assets/images/onboarding1.png"),
        title:t("watchAnyDevice"),
        desc: t("streamAnywhere"),
    },
    {
        image: require("../../../assets/images/onboarding2.png"),
        title: t("findfavourites"),
        desc: t("personalizedmovie"),
    },
    {
        image: require("../../../assets/images/onboarding3.png"),
        title: t("upload"),
        desc: t("abilityposting"),
    },
    {
        image: require("../../../assets/images/onboarding4.png"),
        title: t("howDoIWatch"),
        desc: t("membersSubscribe"),
    },

  ]


  const OnboardItem = ({ item }) => {
    return (
      <View className='items-center w-screen px-[40px] flex-1 justify-center'>
        <Image
          source={item.image}
          resizeMode="contain"
          className='h-[300px] w-[287px]'
        />
        <Text className='text-[24px] font-bold text-white text-center mt-[18px]'>
          {item.title}
        </Text>
        <Text className='text-[20px] text-[#CCC] text-center mt-5'>
          {item.desc}
        </Text>
      </View>
    );
  };
  


  const Dot=({index})=>{
    return (
      <View className={`size-[10px] rounded-full ${activeIndex===index?"bg-[#12151E]":"bg-white"}`}></View>
    )
  }


  const findIndex=({viewableItems})=>{
    setActiveIndex(viewableItems[0].index)
  }

  const handleLanguage = () => {
    setSelectedLanguage((prevState) => (prevState === "en" ? "ru" : "en"));
  };

  return (
    <ImageBackground className="flex-1 bg-[#252631]" >
      <View className="w-full items-center relative mb-[70px]">
        <TouchableOpacity onPress={handleLanguage} className="absolute right-7 top-3">
          <Text className="text-white">{t("language")}</Text>
        </TouchableOpacity>
      </View>

      <FlatList onViewableItemsChanged={findIndex} onScrollToIndexFailed={()=>{setFail(true)}} {...(!fail?{initialScrollIndex:3}:{})} pagingEnabled horizontal data={onboardingItems} 
        renderItem={({ item }) => (
          <OnboardItem item={item}></OnboardItem>
        )}      
      />
      
      <View className="w-full justify-center flex-row gap-5">
        {onboardingItems.map((item,index)=><Dot key={index} index={index}></Dot>)}
      </View>

    
        <TouchableOpacity className="bg-[#3A3CB3] py-4 mx-5 mt-10 mb-5" onPress={() => navigation.navigate("Login")}>
          <Text className="text-center text-white font-bold text-xl">
            {t("getStarted")}
          </Text>
        </TouchableOpacity>

    </ImageBackground>
  );










};

export default Onboarding;
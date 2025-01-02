import { useState } from "react";
import { FlatList,Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const Onboarding = () => {



  const [activeIndex,setActiveIndex]=useState(0)
  const [fail,setFail]=useState(false)

  const navigation = useNavigation()
  const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");
  const { t } = useTranslation();


  const onboardingItems = [
    {
        image: require("../../../assets/images/onboarding1.png"),
        title: "Watch on any device",
        desc: t("streamAnywhere"),
    },
    {
        image: require("../../../assets/images/onboarding2.png"),
        title: "3, 2, 1,... download!",
        desc: t("watchOffline"),
    },
    {
        image: require("../../../assets/images/onboarding3.png"),
        title: "No pesky contracts.",
        desc: t("cancelAnytime"),
    },
    {
        image: require("../../../assets/images/onboarding4.png"),
        title: "How do I watch?",
        desc: t("membersSubscribe"),
    },

  ]


  const OnboardItem = ({ item }) => {
    return (
        <View className='items-center w-screen px-[40px]'>
            <Image source={item.image} className='size-[260px] object-scale-down' />
            <Text className='text-[24px] font-bold text-white text-center mt-[18px]'>{item.title}</Text>
            <Text className='text-[20px] text-[#CCC] text-center mt-5'>{item.desc}</Text>
        </View>
    )
  }


  const Dot=({index})=>{
    return (
      <View className={`size-[10px] ${activeIndex===index?"bg-red-600":"bg-white"}`}></View>
    )
  }


  const findIndex=({viewableItems})=>{
    setActiveIndex(viewableItems[0].index)
  }

  const handleLanguage = () => {
    setSelectedLanguage((prevState) => (prevState === "en" ? "ru" : "en"));
  };

  return (
    <ImageBackground className="flex-1 bg-black" {...(activeIndex===3?{source:onboardingItems[3].image}:{})}>
      <View className="w-full items-center relative mt-[40px] mb-[70px]">
        {/* <NetflixIcon/> */}
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

    
        <TouchableOpacity className="bg-[#E50914] py-4 mx-5 mt-10 mb-5" onPress={() => navigation.navigate("Login")}>
          <Text className="text-center text-white font-bold text-xl">
            {t("getStarted")}
          </Text>
        </TouchableOpacity>

    </ImageBackground>
  );










};

export default Onboarding;
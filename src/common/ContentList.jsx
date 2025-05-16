import { useState, useEffect } from 'react'
import { Text, View, FlatList } from 'react-native'
import ContentCard from './ContentCard'
import { useTranslation } from 'react-i18next'
import { useMMKVString } from "react-native-mmkv";

const ContentList = ({searchTerm,type}) => {

  const [data, setData] = useState([])
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");

  const getData = async () => {
    try {
      //const response = await fetch(searchTerm ? `http://192.168.100.8:5001/api/v1/search/${type}/${searchTerm}`:`http://192.168.100.8:5001/api/v1/${type}/trending`)
      const response = await fetch(`http://10.0.2.2:5124/api/Movie/GetUpcomingMovies?language=en-US`)
      const data = await response.json()
      setData(data.movies);

    } catch (error) {
      console.log(error)
    }
  }

  const NoItems = () => <View className='w-full h-full items-center justify-center'>
    <Text>{t("noitemsfound")}</Text>
  </View>

  useEffect(() => {
    getData()
  }, [searchTerm,type])


  return (
    <>
    <View className='mt-6'>

      <Text className='font-manropeBold text-white font-extrabold text-2xl ml-8 mb-5'>{searchTerm?`${t("resultsfor")}`+` ${type==="tv"?t("tvshows"):t("movies")}`:type==="movie" ?`${t("trendingmovies")}`:`${t("trendingshows")}`}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={NoItems}
        contentContainerStyle={{ gap: 8,paddingHorizontal:22}}
        data={data}
        renderItem={({ item }) => <ContentCard item={item} type={type} />} />
    
    </View>
    </>

  )
}

export default ContentList  
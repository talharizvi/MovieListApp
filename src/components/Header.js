
import React,{useState, useEffect} from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import Category from './Category';
import { apiKey } from '../constants';

const Header = ({onGenreDataChange, onSelectCategoryChange}) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [genreList, setGenreList] = useState([])

  useEffect(()=>{
  
    const fetchGenres = async ()=>{
      const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      const genreData = await genreResponse.json()
      setGenreList(genreData.genres)
      onGenreDataChange(genreData.genres)
    }

    fetchGenres()
  
  },[])

  const handleCategoryPress = (category) => {
    const isCategorySelected = selectedCategory.some((item) => item.id === category.id);
    const updatedCategoryList = isCategorySelected
    ? selectedCategory.filter((item) => item.id !== category.id)
    : [...selectedCategory, category];

    setSelectedCategory(updatedCategoryList);
    onSelectCategoryChange(updatedCategoryList);
  };

  return (
    <View style={styles.header}>
      <Image source={require('../assets/images/Title.png')} width={100} height={50}/>
      <ScrollView style={{flexDirection:'row', marginVertical:8}} horizontal>
        {genreList.map((item)=><Category key={item.id} title={item.name} selected={selectedCategory.some((selectedItem) => selectedItem.id === item.id)} onPress={()=>handleCategoryPress(item)} />)}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#242424',
    paddingLeft:16,
    paddingTop:16,
    paddingBottom:4
  },
  title: {
    color: '#F0283C',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;

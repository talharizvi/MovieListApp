
import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Category from './Category';
import { categoryList } from '../constants';
const Header = ({ title }) => {
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.header}>
      <Image source={require('../assets/images/Title.png')} width={100} height={50}/>
      <ScrollView style={{flexDirection:'row', marginVertical:8}} horizontal>
        {categoryList.map((item, index)=><Category key={index} title={item} selected={item === selectedCategory} onPress={()=>handleCategoryPress(item)} />)}
      </ScrollView>
      
      
    </View>
  );
};

console.log('test')

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

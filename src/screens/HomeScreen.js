import React, {useState, useEffect, useCallback} from "react";
import { Text, View, SectionList,Image, Dimensions, StyleSheet } from "react-native";
import Header from "../components/Header";
import MovieItem from "../components/MovieItem";
import { apiKey } from '../constants';
import useMovies from "../customHooks/useMovies";

const numColumns = 2

const HomeScreen=()=>{

  const {
    sections,
    genreData,
    selectedCategory,
    filteredSections,
    handleEndReached,
    handleGenreData,
    handleCategory,
  } = useMovies(2012, apiKey);

    const renderItem = ({ section, index }) => {
      if (index % numColumns !== 0) return null;
    
      const items = [];
    
      for (let i = index; i < index + numColumns; i++) {
        if (i >= section.data.length) {
          break;
        }
    
        const item = section.data[i];
        
        //items.push(MovieItem(item, genreData))
        items.push(<MovieItem key={item.id} item={item} genreData={genreData} />)
      }
    
      return (
        <View
          key={`row-${index}`}
          style={styles.itemViewStyle}
        >
          {items}
        </View>
      );
    };

    const renderSectionHeader = ({ section }) => (
      <Text style={styles.sectionHeaderText}>
        {section.title}
      </Text>
    );

    return(
        <View style={{flex: 1}}>
          <Header onGenreDataChange={handleGenreData} onSelectCategoryChange={handleCategory}/>
          <View style={{paddingHorizontal:12, paddingVertical:12, backgroundColor:'#000000', flex: 1}}>
          <SectionList
          sections={selectedCategory.length>0?filteredSections: sections}
          renderItem={renderItem}
          renderSectionHeader={({ section }) => renderSectionHeader({ section })}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={
            <View style={styles.emptyView}>
              <Text style={styles.emptyViewText}>No movies found</Text>
            </View>
          }
        />
        
      </View>
        </View>)
}

const styles = StyleSheet.create({
  sectionHeaderText:{ 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 10, 
    marginBottom: 5,
    marginLeft:4 
  },
  emptyView:{
    alignItems: 'center', 
    marginTop: 20
  },
  emptyViewText:{ 
    color: '#ffffff', 
    fontSize: 16 
  },
  itemViewStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default HomeScreen
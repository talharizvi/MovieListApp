import React from "react";
import { View,Text, Image, StyleSheet, Dimensions } from "react-native";
import ProgressCircle from 'react-native-progress-circle';

const windowWidth = Dimensions.get('window').width;

const MovieItem = ({item, genreData})=>{

  const filterGenreNameById=(idArray)=>{
    const genreNames = genreData.filter((item)=>idArray.includes(item.id)).map((item)=>item.name)

    return genreNames.join(", ")
  }

  return(
        <View key={item.id}>
            <View style={styles.listItemView}>
              <Image
                style={styles.itemImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
              />
              <Text numberOfLines={1} style={styles.title}>{item.original_title}</Text>
              <Text numberOfLines={4} style={styles.description}>{item.overview}</Text>
              <Text numberOfLines={2} style={styles.genreStyle}>Genre: {filterGenreNameById(item.genre_ids)}{'\n'}</Text>
              <ProgressCircle
                percent={item.vote_average * 10}
                radius={18}
                borderWidth={4}
                color="#ffb700"
                shadowColor="#999"
              >
                <Text style={{ fontSize: 10, color: '#030000', fontWeight: 'bold' }}>{(item.vote_average)}</Text>
              </ProgressCircle>
    
              <Text numberOfLines={1} style={styles.description}>Release Date: {item.release_date}</Text>
    
            </View>
          </View>
    )
}

export default MovieItem

const styles = StyleSheet.create({
    itemViewStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      description:{ 
        color: '#ffffff', 
        marginBottom: 5 
      },
      title: { 
        marginVertical: 5, fontWeight: 'bold', 
        color: '#f5c242' 
      },
      itemImage: { 
        height: windowWidth / 2 - 16, 
        resizeMode: 'stretch' 
      },
      listItemView: { 
        width: windowWidth / 2 - 16, 
        backgroundColor: '#000000', 
        marginHorizontal: 4, 
        marginVertical: 4 
      },
      genreStyle:{
        color: '#8f8888', 
        marginBottom: 5 
      }
});
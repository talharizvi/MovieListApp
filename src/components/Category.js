import React,{useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Category=({title, selected, onPress})=>{

    return(<TouchableOpacity style={[styles.root, selected && styles.selectedView]} onPress={()=>onPress(title)}>
        <Text style={styles.categoryText}>{title}</Text>
    </TouchableOpacity>)
}

const styles = StyleSheet.create({
    root:{
        backgroundColor: '#484848',
        paddingVertical: 8,
        paddingHorizontal: 12,
        justifyContent:'center',
        alignItems:'center',
        marginRight:12,
        borderRadius:4
    },
    selectedView: {
        backgroundColor: '#F0283C',
    },
    categoryText: {
        color:'#F3F4F6',
        fontSize: 14,
    }
})

export default Category
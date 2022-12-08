import React,{useState} from 'react';
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Store } from '../../schemas';
import colors from '../themes/colors';
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['store_id'];
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
export default function Products({product_info, modal_visible,products, store, navigation, categories}) {
  const [items, setItems] = useState([
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'AMETHYST', code: '#9b59b6' },
    { name: 'WET ASPHALT', code: '#34495e' },
    { name: 'GREEN SEA', code: '#16a085' },
    { name: 'NEPHRITIS', code: '#27ae60' },
    { name: 'BELIZE HOLE', code: '#2980b9' },
    { name: 'WISTERIA', code: '#8e44ad' },
    { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
    { name: 'SUN FLOWER', code: '#f1c40f' },
    { name: 'CARROT', code: '#e67e22' },
    { name: 'ALIZARIN', code: '#e74c3c' },
    { name: 'CLOUDS', code: '#ecf0f1' },
    { name: 'CONCRETE', code: '#95a5a6' },
    { name: 'ORANGE', code: '#f39c12' },
    { name: 'PUMPKIN', code: '#d35400' },
    { name: 'POMEGRANATE', code: '#c0392b' },
    { name: 'SILVER', code: '#bdc3c7' },
    { name: 'ASBESTOS', code: '#7f8c8d' },
  ]);

  const filteredProducts = products.filter(createFilter(store._id, KEYS_TO_FILTERS))
  return (
    <>
    <FlatGrid
      itemDimension={80}
      data={filteredProducts}
      // staticDimension={300}
      // fixed
      spacing={15}
      renderItem={({ item }) => (
        item.store_id === store._id ?
        <TouchableOpacity onLongPress={()=>{ modal_visible(true), product_info(item)}} onPress={()=> navigation.navigate('ProductDetails', { product: item, categories: categories, store: store})} style={styles.itemContainer}>
          <Image source={{uri: item.img}} resizeMode="stretch" style={{flex: 2, height: 80, width: '100%'}}/>
          <View style={{paddingVertical: 5}}>
            <Text style={{textAlign:'center', fontSize:10, fontWeight:'700'}}>{item.name}</Text>
            <Text style={{textAlign:'center', fontSize:9}}>{item.brand}</Text>
            <Text style={{textAlign:'center', fontSize:9}}>{Math.round(item.stock * 100) / 100} In Stock</Text>
          </View>
          {
            item.stock < 10 ?<Text style={{paddingHorizontal: 2,paddingVertical: 2, backgroundColor:colors.red, borderRadius: 15,position: 'absolute', right: 10, top: 10,}}>
               <MaterialCommunityIcons name={'alert-octagram-outline'} size={20} color={colors.white}/>
            </Text> : null
          }
          
        </TouchableOpacity>: null
      )}
    />
    </>
  );
}

const styles = StyleSheet.create({

  itemContainer: {
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 5,
   
    height: 150,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  },
  itemName: {
    fontSize: 16,
    color: colors.charcoalGrey,
    fontWeight: '600',
    textAlign: 'center'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: colors.charcoalGrey,
  },
});
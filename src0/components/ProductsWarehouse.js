import React,{useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Store } from '../../schemas';
import colors from '../themes/colors';

export default function ProductsWarehouse({products, store, navigation, categories}) {
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

  return (
    <>
    <FlatGrid
      itemDimension={130}
      data={products}
      // staticDimension={300}
      // fixed
      spacing={15}
      renderItem={({ item }) => (
        item.store_id === store._id &&
        <TouchableOpacity onPress={()=> navigation.navigate('ProductWarehouseDetails', { product: item, categories: categories})} style={[styles.itemContainer, { backgroundColor: colors.primary }]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCode}>{item.stock} {item.unit}</Text>
          <Text style={styles.itemCode}>In stocks</Text>
        </TouchableOpacity>
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
    padding: 15,
    height: 150,
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
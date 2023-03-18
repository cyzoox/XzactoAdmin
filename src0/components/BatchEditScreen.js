import React, { useRef, useState } from "react";
import { Text, StyleSheet, View,TouchableOpacity, FlatList ,TextInput} from "react-native";
import AppHeader from "./AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { Categories } from "./Categories";
import DataTable from "./DataTable";
import { useStore } from "../context/StoreContext";
import { Row, Col, Grid } from 'react-native-easy-grid';
import SearchInput, { createFilter } from 'react-native-search-filter';
import formatMoney from 'accounting-js/lib/formatMoney.js'
import Realm from "realm";
const KEYS_TO_FILTERS = ['name', 'category'];

const BatchEditScreen = ({navigation, route}) => {
    const info =  route.params.info
  
    const [term, setTerm] = useState('');
    const { 
        createStore, 
        deleteTask, 
        stores, 
        loading, 
        createProducts,
        products,
        createCategories,
        category,
        updateBatchProduct
    } = useStore();
    const realmRef = useRef(null);

    const filteredProducts = products.filter(createFilter(term, KEYS_TO_FILTERS))
    const onTabChange = (sterm) => {
        setTerm(sterm)
    }

   
    

    const calculateTotalStocks = () => {
        let total = 0;
        filteredProducts.forEach(item => {
            total += item.stock*item.oprice
        });
        return total;
    }

    const calculateTotalCapital = () => {
        let total = 0;
        filteredProducts.forEach(item => {
            total += item.stock*item.oprice
        });
        return total;
    }

    const renderItem = ({ item }) => (
        item.store_id === info._id ?
        <Row style={{marginVertical: 5}}>     
          <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <TextInput
                    underlineColorAndroid = 'transparent'
                    style={{fontSize: 15}}
                    placeholder={item.name}
                    placeholderTextColor="black"
                    onEndEditing={(e) =>{e.nativeEvent.text.length === 0? {}: updateBatchProduct(item, e.nativeEvent.text, 'name')}}
                    
                />
          </Col>   
          <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <TextInput
                    underlineColorAndroid = 'transparent'
                    style={{fontSize: 15}}
                    keyboardType="decimal-pad"
                    placeholder={formatMoney(item.oprice, { symbol: "₱", precision: 2 })}
                    placeholderTextColor="black"
                    onEndEditing={(e) =>{e.nativeEvent.text.length === 0? {}: updateBatchProduct(item, parseFloat(e.nativeEvent.text), 'oprice')}}
                    
                />
              
          </Col> 
          <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <TextInput
                    underlineColorAndroid = 'transparent'
                    style={{fontSize: 15}}
                    keyboardType="decimal-pad"
                    placeholder={formatMoney(item.sprice, { symbol: "₱", precision: 2 })}
                    placeholderTextColor="black"
                    onEndEditing={(e) =>{e.nativeEvent.text.length === 0? {}: updateBatchProduct(item, parseFloat(e.nativeEvent.text), 'sprice')}}
                    
                />
               
          </Col> 
          <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <TextInput
                    underlineColorAndroid = 'transparent'
                    style={{fontSize: 15}}
                    keyboardType="decimal-pad"
                    placeholder={`${Math.round(item.stock * 100) / 100}`}
                    placeholderTextColor="black"
                    onEndEditing={(e) =>{e.nativeEvent.text.length === 0? {}: updateBatchProduct(item, parseFloat(e.nativeEvent.text), 'stock')}}
                    
                />
           
          </Col>
        </Row> : null
    )
  return (
      <View style={{flex: 1}}>
          <AppHeader 
          centerText="Batch Edit" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
      
      />
       <Categories tabs = {category} store={info} onTabChange={onTabChange}/>
            <DataTable
            ototal={calculateTotalCapital()}
          total={calculateTotalStocks()}
          headerTitles={['Product', 'Capital', 'Selling Price', 'Quantity']}
          alignment="center"
        >
          <FlatList
                keyExtractor={(key) => key._id}
                data={filteredProducts}
                renderItem={renderItem}
              />
        </DataTable>
      </View>
  );
};

const styles = StyleSheet.create({
    textColor: {
        fontSize: 14,
        color: colors.black,
        textAlign:'center'
      },
      ColStyle: {
          width: 120,
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderBottomColor: colors.grey,
          paddingBottom: 5
      }
});

export default BatchEditScreen;

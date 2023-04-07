import React, { useState } from "react";
import { Text, StyleSheet , TouchableOpacity, View, FlatList} from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useStore } from "../context/StoreContext";
import { useRoute } from "@react-navigation/native";
import colors from "../themes/colors";
import { Categories } from "../components/Categories";
import DataTable from "../components/DataTable";
import { Row, Col, Grid } from 'react-native-easy-grid';
import SearchInput, { createFilter } from 'react-native-search-filter';
import formatMoney from 'accounting-js/lib/formatMoney.js'
import { useAuth } from "../context/AuthContext";

const KEYS_TO_FILTERS = ['name', 'category'];

const WarehouseRemainingStock = ({navigation}) => {
    const {user} = useAuth();
  
    const [term, setTerm] = useState('');
    const {  
        warehouse_category,
          warehouse_products,
    } = useStore();
    const filteredProducts = warehouse_products.filter(createFilter(term, KEYS_TO_FILTERS))
    const [stocks, setStocks] = useState(filteredProducts);

    const onPressAsc = () => {
      const filteredProductsss = warehouse_products.filter(createFilter(term, KEYS_TO_FILTERS))
      setStocks(filteredProductsss.sort((a, b) => { return a.stock - b.stock; }))
    }

    const onPressDesc = () => {
      setStocks(filteredProducts.sort((a, b) => { return b.stock - a.stock; }))
    }


    const onTabChange = (sterm) => {
      setTerm(sterm)
      const filteredProductss = warehouse_products.filter(createFilter(sterm, KEYS_TO_FILTERS))
        setStocks(filteredProductss.sort((a, b) => { return a.stock - b.stock; }))
    }

const renderItem = ({ item }) => (
    
    <Row style={{marginVertical: 5}}>     
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.name}</Text>
      </Col>   
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{formatMoney(item.stock*item.sprice, { symbol: "₱", precision: 2 })}</Text>
      </Col>
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{Math.round(item.stock * 100) / 100}</Text>
      </Col>
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{formatMoney(item.oprice, { symbol: "₱", precision: 2 })}</Text>
      </Col> 
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{formatMoney(item.sprice, { symbol: "₱", precision: 2 })}</Text>
      </Col> 
     
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{formatMoney(item.stock*item.oprice, { symbol: "₱", precision: 2 })}</Text>
      </Col>
     
    </Row>
)

    const calculateTotalStocks = () => {
        let total = 0;
        stocks.forEach(item => {

        total += item.stock*item.sprice
    
       
        });
        return total;
    }

    const calculateTotalCapital = () => {
        let total = 0;
        stocks.forEach(item => {
  
            total += item.stock*item.oprice
           
           
        });
        return total;
    }

  return (
      <View style={{flex: 1}}>
          <AppHeader
            centerText="Remaining Stock"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
                </TouchableOpacity>
              }
              rightComponent={
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={()=>onPressAsc()} style={{marginRight: 10}}>
                  <MaterialCommunityIcons name={'sort-ascending'} size={25} color={colors.white}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> onPressDesc()}>
                  <MaterialCommunityIcons name={'sort-descending'} size={25} color={colors.white}/>
                </TouchableOpacity>
                </View>
              }
            />
            <Categories tabs = {warehouse_category} store={user} onTabChange={onTabChange}/>
            <DataTable
            ototal={calculateTotalCapital()}
          total={calculateTotalStocks()}
          headerTitles={['Product','Total Stocks', 'Quantity', 'Capital', 'Selling Price', 'Total Capital']}
          alignment="center"
        >
          <FlatList
                keyExtractor={(key) => key._id}
                data={stocks}
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
  

export default WarehouseRemainingStock;

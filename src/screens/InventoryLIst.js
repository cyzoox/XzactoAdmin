import React, { useState } from "react";
import { Text, StyleSheet , TouchableOpacity, View, FlatList} from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useStore } from "../context/StoreContext";
import { useRoute } from "@react-navigation/native";
import colors from "../themes/colors";
import { Categories } from "../components/Categories";
import DataTable from "../components/DataTable";
import { Row, Col, Grid } from 'react-native-easy-grid';
import SearchInput, { createFilter } from 'react-native-search-filter';
import formatMoney from 'accounting-js/lib/formatMoney.js'

const KEYS_TO_FILTERS = ['name', 'category'];

const InventoryScreen = ({navigation}) => {
    const route = useRoute();
  const info =  route.params.info
  
    const [term, setTerm] = useState('');
    const {  
        products,
        category
    } = useStore();
    const filteredProducts = products.filter(createFilter(term, KEYS_TO_FILTERS))
    const onTabChange = (sterm) => {
        setTerm(sterm)
    }

const renderItem = ({ item }) => (
    <Row style={{marginVertical: 5}}>     
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.name}</Text>
      </Col>   
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{formatMoney(item.oprice, { symbol: "₱", precision: 2 })}</Text>
      </Col> 
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{formatMoney(item.oprice, { symbol: "₱", precision: 2 })}</Text>
      </Col> 
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{Math.round(item.stock * 100) / 100}</Text>
      </Col>
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{formatMoney(item.stock*item.oprice, { symbol: "₱", precision: 2 })}</Text>
      </Col>
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{formatMoney(item.stock*item.sprice, { symbol: "₱", precision: 2 })}</Text>
      </Col>
    </Row>
)

    const calculateTotalStocks = () => {
        let total = 0;
        filteredProducts.forEach(item => {
            total += item.stock*item.sprice
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

  return (
      <View style={{flex: 1}}>
          <AppHeader
            centerText="Remaining Stock"
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
          headerTitles={['Product', 'Capital', 'Selling Price', 'Quantity', 'Total Capital', 'Total Stocks']}
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
  

export default InventoryScreen;

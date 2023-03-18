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
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";
import CustomModal from "../components/CustomModal";

const KEYS_TO_FILTERS = ['name', 'category'];

const WarehouseInventory = ({navigation}) => {
    const{user} = useAuth();
  
    const [term, setTerm] = useState('');
    const [confirm, setConfirm] = useState(false);
    
    const { 
        createStore, 
        deleteTask, 
        stores, 
        loading, 
        createProducts,
        products,
        createCategories,
        category,
        warehouse_products,
        warehouse_category
    } = useStore();
    const filteredProducts = warehouse_products.filter(createFilter(term, KEYS_TO_FILTERS))
    const onTabChange = (sterm) => {
        setTerm(sterm)
    }

const renderItem = ({ item }) => (

    <Row style={{marginVertical: 5}}>     
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.name}</Text>
      </Col>   
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.oprice}</Text>
      </Col> 
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.sprice}</Text>
      </Col> 
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.stock}</Text>
      </Col>
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.stock*item.oprice}</Text>
      </Col>
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.stock*item.sprice}</Text>
      </Col>
    </Row>
)

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

  return (
      <View style={{flex: 1}}>
        <Alert title="Test" confirmTitle="Proceed" visible={confirm} content="jhqof kjwn kjnwsed kndikw nkw jnedw jknweed knwek"/>
  
          <AppHeader
            centerText="Warehouse Inventory"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
                </TouchableOpacity>
              }

            />
            <Categories tabs = {warehouse_category} store={user} onTabChange={onTabChange}/>
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
      fontSize: 12,
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
  

export default WarehouseInventory;

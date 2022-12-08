import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ScrollView, Modal } from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";
import { AddExpenses } from "../components/AddExpenses";
import DataTable from "../components/DataTable";
import { Row, Col, Grid } from 'react-native-easy-grid';
import { useState } from "react";
import { ModalInputForm } from "../components/ModalInputForm";
import {TextInput } from 'react-native-paper';
import { useAuth } from "../context/AuthContext";
import moment from 'moment'
import uuid from 'react-native-uuid';
import {DatePicker} from "react-native-common-date-picker";

const OverAllExpenses = ({navigation, route}) => {
  const {user} = useAuth();
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedStoreInfo, setSelectedStoreInfo]= useState([]);
  const [custompick1, setCustomPicker1] = useState(false)
  const [custompick2, setCustomPicker2] = useState(false)
  const [specificDate, setSpecificDatePicker] = useState(false)
  const [specific_date, setSpecificDate] = useState('');
  const [filter, setFilter] = useState('Today')
  const [attendant, setAttendant] = useState('');
  const [attendant_info, setAttendantInfo] = useState([]);
  const today = moment().unix()

  const { 
    createStore, 
    deleteTask, 
    stores, 
    loading, 
    createProducts,
    products,
    createCategories,
    category,
    createExpenses,
    expenses,
    getCustomExpenses2,
    custom_expenses2
  } = useStore();

  const [description, setExpense] = useState('')
  const [amount, setAmount] = useState('')


  const onSelectFilter = () => {
  
    let date = moment().unix()
    let today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
    let yesterday = `${moment.unix(date).subtract(1, 'day').format('MMMM DD, YYYY')}`;
    let thisweek = `${moment.unix(date).format('ww')}`;
    let lastweek = `${moment.unix(date).format('ww')-1}`;
    let thismonth = `${moment.unix(date).format('MMMM YYYY')}`;
    let lastmonth = `${moment.unix(date).subtract(1, 'month').format('MMMM YYYY')}`;
    let thisyear = `${moment.unix(date).format('YYYY')}`;
    let lastyear = `${moment.unix(date).subtract(1, 'year').format('YYYY')}`;
    let lastdays = `${moment.unix(date).subtract(30, 'day').startOf('day')/ 1000}`;
   
      switch (filter) {
        
        case "Today":
          getCustomExpenses2(selectedStoreInfo._id, today,1)
 
          break;
  
        case "Yesterday":
          getCustomExpenses2(selectedStoreInfo._id,yesterday,  1)
   
          break;
  
        case "This Week":
          getCustomExpenses2(selectedStoreInfo._id,`${thisweek+"-"+thisyear}`,  2)

          break;
  
        case "Last Week":
          getCustomExpenses2( selectedStoreInfo._id,`${lastweek+"-"+thisyear}`,  2)
  
          break;
  
        case "This Month":
          getCustomExpenses2(selectedStoreInfo._id,`${thismonth+"-"+thisyear}`,  3)
         
          break;
  
        case "Last Month":
          getCustomExpenses2(selectedStoreInfo._id, `${lastmonth+thisyear}`, 3)    
          break;
  
        case "This Year":
          getCustomExpenses2(selectedStoreInfo._id, thisyear,  5)
        
          break;
  
        case "Last Year":
          getCustomExpenses2(selectedStoreInfo._id,lastyear,  5)       
          break;
  
        default:
          getCustomExpenses2(selectedStoreInfo._id,filter,  5)   
          break;
      } 
  }




  const renderItem = ({ item }) => (
    <Row style={{height: 40,shadowColor: "#EBECF0", marginVertical:1.5,marginHorizontal: 5,backgroundColor:'white'}}>    
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.description}</Text>
      </Col>   
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.amount}</Text>
      </Col> 
      <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.attendant}</Text>
      </Col> 
    </Row>
)

  return (
    <View style={{flex: 1}}>
        <AppHeader 
          centerText="Expenses"
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
        gradient
         />
      <View style={{flexDirection:"column"}}>
        <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom: 5}}>
          <TouchableOpacity style={styles.filterStyle}>
          <ModalInputForm
                displayComponent={
                    <>
                        <Text style={{ color: colors.black,  fontWeight:'700'}}>{selectedStore.length === 0 ? "Select Store": selectedStore}</Text>
                    </>
                }
                title="Select Store"
                onSave={()=> onSelectFilter()}
              >
                <ScrollView>
                  {
                    stores.map((item, index) => 
                      <TouchableOpacity style={item.name === selectedStore ? [styles.storeList,{ borderColor:colors.accent}] : styles.storeList} onPress={()=> {setSelectedStore(item.name), setSelectedStoreInfo(item)}}>
                        <Text style={{textAlign: 'center', fontWeight:'700', fontSize: 17, textTransform:'uppercase'}}>{item.name}</Text>
                     </TouchableOpacity>
                    )
                  }
                </ScrollView>
              </ModalInputForm>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterStyle}>
          <ModalInputForm
                displayComponent={
                    <>
                        <Text style={{ color: colors.black,  fontWeight:'700'}}>{filter.length === 0? 'Select Date' : filter}</Text>
                    </>
                    
                }
                title="Select Date" 
                onSave={()=> onSelectFilter()}
              >
                 <View style={{marginVertical: 10}}>
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight:'700'}}>Custom Date</Text>
              </View>
             
              <View style={{justifyContent:'space-evenly', flexDirection:'row'}}>
                <TouchableOpacity style={filter === 'Today' ? styles.dateFilter : [styles.dateFilter,{backgroundColor: colors.white}]} onPress={()=> setFilter("Today")}>
               
                  <Text style={{paddingVertical: 5, paddingHorizontal:3, textAlign: 'center'}}> Today</Text>
                </TouchableOpacity>
                <TouchableOpacity style={filter === 'Yesterday' ? styles.dateFilter : [styles.dateFilter,{backgroundColor: colors.white}]} onPress={()=> setFilter("Yesterday")}>
         
                  <Text style={{paddingVertical: 5, paddingHorizontal:3, textAlign:'center'}}> Yesterday</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent:'space-evenly', flexDirection:'row'}} >
                <TouchableOpacity style={filter === 'This Week' ? styles.dateFilter : [styles.dateFilter,{backgroundColor: colors.white}]} onPress={()=> setFilter("This Week")}>
               
                  <Text style={{paddingVertical: 5, paddingHorizontal:3, textAlign: 'center'}}> This Week</Text>
                </TouchableOpacity>
                <TouchableOpacity style={filter === 'Last Week' ? styles.dateFilter : [styles.dateFilter,{backgroundColor: colors.white}]} onPress={()=> setFilter("Last Week")}>
         
                  <Text style={{paddingVertical: 5, paddingHorizontal:3}} > Last Week</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent:'space-evenly', flexDirection:'row'}}>
                <TouchableOpacity style={filter === 'This Month' ? styles.dateFilter : [styles.dateFilter,{backgroundColor: colors.white}]} onPress={()=> setFilter("This Month")}>
               
                  <Text style={{paddingVertical: 5, paddingHorizontal:3, textAlign: 'center'}} > This Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={filter === 'Last Month' ? styles.dateFilter : [styles.dateFilter,{backgroundColor: colors.white}]} onPress={()=> setFilter("Last Month")}>
         
                  <Text style={{paddingVertical: 5, paddingHorizontal:3}} > Last Month</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent:'space-evenly', flexDirection:'row'}}>
                <TouchableOpacity style={filter === 'This Year' ? styles.dateFilter : [styles.dateFilter,{backgroundColor: colors.white}]} onPress={()=> setFilter("This Year")} >
               
                  <Text style={{paddingVertical: 5, paddingHorizontal:3, textAlign: 'center'}} > This Year</Text>
                </TouchableOpacity>
                <TouchableOpacity style={filter === 'Last Year' ? styles.dateFilter : [styles.dateFilter,{backgroundColor: colors.white}]} onPress={()=> setFilter("Last Year")}>
         
                  <Text style={{paddingVertical: 5, paddingHorizontal:3}}> Last Year</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight:'700'}}>Specific Date</Text>
              </View>
              <View style={{justifyContent:'center', flexDirection:'row', marginHorizontal: 40}}>
              <TouchableOpacity style={{borderWidth: 1, flexDirection:'row', alignItems:'center', flex: 1, marginHorizontal: 2}}onPress={() => setSpecificDatePicker(true)}>
              <EvilIcons name={'calendar'} size={30} color={colors.boldGrey}/>
               <Text style={{fontSize:15, fontWeight:'900', textAlign:'center', paddingVertical: 5, paddingHorizontal:3}}>
                       Specific Date
                   </Text>
               </TouchableOpacity>
              </View>
              {/*
            <View style={{marginVertical: 10}}>
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight:'700'}}>Custom Filter</Text>
              </View>
              <View style={{justifyContent:'space-evenly', flexDirection:'row'}}>
              <TouchableOpacity style={{borderWidth: 1, flexDirection:'row', alignItems:'center', flex: 1, marginHorizontal: 2}}onPress={() => setCustomPicker1(true)}>
              <EvilIcons name={'calendar'} size={30} color={colors.boldGrey}/>
               <Text style={{fontSize:15, fontWeight:'900', textAlign:'center', paddingVertical: 5, paddingHorizontal:3}}>
                       Start Date
                   </Text>
               </TouchableOpacity>
               <TouchableOpacity style={{borderWidth: 1, flexDirection:'row', alignItems:'center', flex: 1, marginHorizontal: 2}} onPress={() => setCustomPicker2(true)}>
               <EvilIcons name={'calendar'} size={30} color={colors.boldGrey}/>

               <Text style={{fontSize:15, fontWeight:'900', textAlign:'center', paddingVertical: 5, paddingHorizontal:3}}>
                       End Date
                   </Text>
               </TouchableOpacity>
              </View>
              */}
             
              </ModalInputForm>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType={'slide'} visible={specificDate} transparent>
                   <View style={{ flex: 1 ,flexDirection: 'column', justifyContent: 'flex-end'}}>
                        <View style={{ height: "30%" ,width: '100%',  justifyContent:"center"}}>
                            <DatePicker
                                monthDisplayMode={'en-long'}
                                minDate={'2020-03-06'}
                                                    confirm={date => {
                                       setSpecificDate(moment(date,'YYYY-MM-DD').format('MMMM DD, YYYY')),
                                       setSpecificDatePicker(false)
                                       setFilter(moment(date,'YYYY-MM-DD').format('MMMM DD, YYYY'))
                                    }}
                                    cancel={date => {
                                      setSpecificDatePicker(false)
                                    }}
                                titleText="Select Start Date"
                                cancelText="Cancel"
                                toolBarStyle={{backgroundColor: colors.accent}}
                                /> 
                    </View>
                    </View>
          </Modal>
      <DataTable
          headerTitles={['Description', 'Amount', 'Attendant']}
          total={0}
          alignment="center"
        >
          <FlatList
                keyExtractor={(key) => key.uid}
                data={custom_expenses2}
                renderItem={renderItem}
              />
        </DataTable>    
    </View>
  );
};

OverAllExpenses.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  ColStyle: {
    width: 120,
    justifyContent: 'center',
    paddingBottom: 5,
},
textColor: {
  fontSize: 14,
  color: colors.black,
  fontWeight:'600',
  textAlign:'center'
} ,
avatarStyle: {
  borderColor: colors.accent,
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 20,
  backgroundColor:colors.white
},
listStyle: {
  flexDirection:'row',
  justifyContent:'space-between', 
  backgroundColor: colors.white,
  borderColor: colors.accent,
  borderWidth: 1,
  shadowColor: "#EBECF0",
shadowOffset: {
  width: 0,
  height: 5,
 
},
shadowOpacity: 0.89,
shadowRadius: 2,
elevation: 5,
paddingVertical: 15, 
marginHorizontal: 10, 
marginVertical: 5,
paddingHorizontal: 10, 
borderRadius: 10},
filterStyle: {
  backgroundColor:colors.white, 
  paddingVertical: 9, 
  width: '45%',
  borderRadius: 5,
  shadowColor: "#EBECF0",
  shadowOffset: {
    width: 0,
    height: 5,
   
  },
  shadowOpacity: 0.89,
  shadowRadius: 2,
  elevation: 5,
  borderColor: colors.white,
  borderWidth:  1
},
storeList: {
  flex: 1,
  borderColor: colors.boldGrey,
  borderWidth: 1,
  paddingVertical: 8,
  marginVertical: 5,
  borderRadius: 5,
  backgroundColor: colors.white,
  shadowColor: "#EBECF0",
  shadowOffset: {
    width: 0,
    height: 2,
   
  },
  shadowOpacity: 0.89,
  shadowRadius: 2,
  elevation: 2,
},
dateFilter : {
  borderWidth: 1, 
  borderRadius: 5, 
  flexDirection:'row', 
  alignItems:'center', 
  flex: 1, 
  margin: 2, 
  justifyContent:'center', 
  borderColor: colors.accent,
backgroundColor: colors.accent}
});

export default OverAllExpenses;

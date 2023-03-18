import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, FlatList , Modal} from "react-native";

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AppHeader from "../components/AppHeader";
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";

import { Avatar, ListItem, Overlay } from "react-native-elements";
import { ModalInputForm } from "../components/ModalInputForm";
import moment from 'moment'
import formatMoney from 'accounting-js/lib/formatMoney.js'
import {DatePicker} from "react-native-common-date-picker";

const WarehouseDeliveryStockReport = ({navigation}) => {
  const {warehouse_delivery_report, warehouse_delivery_report_summary,getWarehouseSummary} = useStore();
  const [filter, setFilter] = useState('Today')
  const [specificDate, setSpecificDatePicker] = useState(false)
  const [specific_date, setSpecificDate] = useState('');

  useEffect(() => {
    let date = moment().unix()
    let today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
    getWarehouseSummary(today, 1)
  },[]);

  const calculateTotal = () => {
    let total = 0;

    warehouse_delivery_report_summary.forEach(item => {
      total += item.total
    });

    return total;
  }

  const calculateTotalQty = () => {
    let total = 0;

    warehouse_delivery_report.forEach(item => {
      total += item.quantity
    });

    return total;
  }



  const onSelectFilter = () => {
  
    let date = moment().unix()
    let today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
    let yesterday = `${moment.unix(date).subtract(1, 'day').format('MMMM DD, YYYY')}`;
    let thisweek = `${moment.unix(date).format('WW')}`;
    let lastweek = `${moment.unix(date).format('WW')-1}`;
    let thismonth = `${moment.unix(date).format('MMMM')}`;
    let lastmonth = `${moment.unix(date).subtract(1, 'month').format('MMMM')}`;
    let thisyear = `${moment.unix(date).format('YYYY')}`;
    let lastyear = `${moment.unix(date).subtract(1, 'year').format('YYYY')}`;
    let lastdays = `${moment.unix(date).subtract(30, 'day').startOf('day')/ 1000}`;
   
 
      switch (filter) {
        case "Today":
          getWarehouseSummary(today, 1)
          break;
  
        case "Yesterday":
      
          getWarehouseSummary(yesterday,  1)
          break;
  
        case "This Week":
          getWarehouseSummary( `${thisweek+'-'+thisyear}`,  3)
          break;
  
        case "Last Week":
          getWarehouseSummary(`${lastweek+'-'+thisyear}`, 3)
          break;
  
        case "This Month":
          getWarehouseSummary(`${thismonth+'-'+thisyear}`,  2)
          break;
  
        case "Last Month":
          getWarehouseSummary(`${lastmonth+'-'+thisyear}`, 2)
          break;
  
        case "This Year":
          getWarehouseSummary(thisyear,  5)
          break;
  
        case "Last Year":
          getWarehouseSummary( lastyear,  5)
          break;
  
        default:
          getWarehouseSummary(filter, 1)
          break;
      
    }

   
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listStyle} onPress={()=> navigation.navigate('WarehouseDeliveryDetail', {delivery: item})}>
      <View style={{flexDirection: 'row'}}>
        <View style={{paddingRight: 10}}>
          <Avatar containerStyle={styles.avatarStyle} size={45} icon={{ name: 'receipt-outline', type: 'ionicon', color: colors.accent }}/>
        </View>
        <View>
          <Text style={{color: colors.black, marginBottom: 3, fontWeight:'700', fontSize: 16, fontFamily:'Monospace'}}>
            {item.delivery_receipt}
          </Text>
          <Text style={{color: colors.boldGrey, fontSize: 13, fontFamily: ''}}>
            {moment.unix(item.timeStamp).format('DD MMM YYYY hh:mmA')}
          </Text>
        </View>
      </View>
      <View style={{justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontSize: 17, color: colors.black, fontWeight: '700'}}>{formatMoney(item.total, { symbol: "₱", precision: 2 })}</Text>
          <Text style={{fontSize: 10, color: colors.boldGrey, textDecorationLine:'underline'}}>Tap to view >></Text>
      </View>
    </TouchableOpacity>
  );


  return(
    <View style={{flex: 1}}>
      <AppHeader 
            centerText="Warehouse Delivery Reports"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
                </TouchableOpacity>
              } 
              screen="Warehouse"
         />
           <View style={styles.filter}>
                <View style={{flex: 1,borderRightWidth: 1,flexDirection:'row', justifyContent:'center', alignSelf:'center'}}>
                <EvilIcons name={'calendar'} size={40} color={colors.coverDark}/>
                </View>
                <TouchableOpacity style={{flex: 3}}>
                <ModalInputForm
              displayComponent={
                  <>
                      <Text style={{ color: colors.black,  fontWeight:'700', fontSize: 16, textAlign:'center', marginTop: 5}}>{filter.length === 0? 'Select Date' : filter}</Text>
                      
                  </>
              }
              title="Select Date" 
              onSave={()=> onSelectFilter()}
            >
            

           
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
        <FlatList
          data={warehouse_delivery_report_summary}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          />
             <View style={{flexDirection:'row', justifyContent:'space-between', borderColor: colors.accent, borderWidth: 1, paddingVertical: 10, marginHorizontal: 10, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5,backgroundColor: colors.accent,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 2,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 2}}>
          <Text style={{fontSize: 16, fontWeight:'700'}}>Total</Text>
          <Text style={{fontSize: 16, fontWeight:'700'}}>{formatMoney(calculateTotal(), { symbol: "₱", precision: 2 })}</Text>
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
  backgroundColor: colors.accent},
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
  filter: {
    backgroundColor: colors.white,
    marginHorizontal: 30 ,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection:'row', 
    justifyContent:'space-around', 
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  }

});

export default WarehouseDeliveryStockReport;

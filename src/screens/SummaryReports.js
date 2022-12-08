import React,{useEffect,useState} from "react";
import { Text, StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import { Overlay, Input, Button } from "react-native-elements";
import { Card, Divider, Headline } from "react-native-paper";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";
import formatMoney from 'accounting-js/lib/formatMoney.js'

import moment from 'moment'
import { useRoute } from "@react-navigation/native";
import {DatePicker} from "react-native-common-date-picker";
import { ModalInputForm } from "../components/ModalInputForm";

const SummaryReport = ({navigation}) => {
  const route = useRoute();
  const store_data =  route.params.store
const { getCustomSales, custom_transactions, getCustomExpenses2, custom_expenses2} = useStore();
const [open, setOpen] = useState(false);
const [custom_date,selectCustomDate] = useState('');
const [date, setDate] = useState(new Date());
const [overlayVisible, setOverlayVisible] = useState(false);
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
const calculateTotalCash = () => {
    let total = 0;

    custom_transactions.forEach(item => {
        if(item.payment_method === "Cash" && item.status === 'Completed'){
            total += item.total
        }
        
    });

    return total;
}

const calculateTotalCredit = () => {
    let total = 0;

    custom_transactions.forEach(item => {
        if(item.payment_method === "Credit"){
            total += item.total
        }
        
    });
    return total;
}

const calculateTotalExpenses= () => {
    let total = 0;

    custom_expenses2.forEach(item => {
     total += item.amount;
        
    });
    return total;
}



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
        getCustomSales(store_data._id, today, 1)
        getCustomExpenses2(store_data._id, today,  1)
        setOverlayVisible(false)
        break;

      case "Yesterday":
    
        getCustomSales(store_data._id, yesterday,  1)
        getCustomExpenses2(store_data._id, yesterday,  1)
        setOverlayVisible(false)
        break;

      case "This Week":
        getCustomSales(store_data._id, `${thisweek+'-'+thisyear}`,  3)
        getCustomExpenses2(store_data._id, `${thisweek+'-'+thisyear}`,  3)
        setOverlayVisible(false)
        break;

      case "Last Week":
        getCustomSales(store_data._id, `${lastweek+'-'+thisyear}`, 3)
        getCustomExpenses2(store_data._id, `${lastweek+'-'+thisyear}`,  3)
        setOverlayVisible(false)
        break;

      case "This Month":
        getCustomSales(store_data._id, `${thismonth+'-'+thisyear}`,  2)
        getCustomExpenses2(store_data._id, `${thismonth+'-'+thisyear}`,  2)
        setOverlayVisible(false)
        break;
+
        getCustomSales(store_data._id, `${lastmonth+'-'+thisyear}`, 2)
        getCustomExpenses2(store_data._id, `${lastmonth+'-'+thisyear}`,  2)
        setOverlayVisible(false)
        break;

      case "This Year":
        getCustomSales(store_data._id, thisyear,  5)
        getCustomExpenses2(store_data._id, thisyear,  5)
        setOverlayVisible(false)
        break;

      case "Last Year":
        getCustomSales(store_data._id, lastyear,  5)
        getCustomExpenses2(store_data._id, lastyear,  5)
        setOverlayVisible(false)
        break;

      default:
        getCustomSales(store_data._id, filter, 1)
        getCustomExpenses2(store_data._id, filter,  1)
        setOverlayVisible(false)
        break;
    }

}

  return(
     <View>
         <AppHeader
            centerText="Reports Summary"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
                </TouchableOpacity>
              }
          
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
         <Card style={styles.cardStyle}>
             <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5}}>
             <Text style={{fontSize: 17, fontWeight:'700'}}>Sales</Text>
          
             </View>
            
             <Divider />
            <View style={{flexDirection: 'row', justifyContent:'space-between', padding: 10}}>
                <Text>Cash</Text>
                <Text>{formatMoney(calculateTotalCash(), { symbol: "₱", precision: 2 })}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-between', padding: 10}}>
                <Text>Credit</Text>
                <Text>{formatMoney(calculateTotalCredit(), { symbol: "₱", precision: 2 })}</Text>
            </View>
         </Card>
         <Card style={styles.cardStyle}>
             <Text style={{fontSize: 17, fontWeight:'700', marginBottom: 5}}>Total</Text>
             <Divider />
            <View style={{flexDirection: 'row', justifyContent:'space-between', padding: 10}}>
                <Text>Total Sales</Text>
                <Text>{formatMoney(calculateTotalCredit() + calculateTotalCash(), { symbol: "₱", precision: 2 })}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-between', padding: 10}}>
                <Text>Expenses</Text>
                <Text>{formatMoney(calculateTotalExpenses(), { symbol: "₱", precision: 2 })}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-between', padding: 10}}>
                <Text>Credit Payments</Text>
                <Text>0.00</Text>
            </View>
            <Divider />
            <View style={{flexDirection: 'row', justifyContent:'space-between', padding: 10}}>
                <Text>Cash Remitted</Text>
                <Text>{formatMoney((calculateTotalCash()+calculateTotalCredit())-calculateTotalExpenses(), { symbol: "₱", precision: 2 })}</Text>
            </View>
         </Card>
        
          <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "85%" }}
        onBackdropPress={() => setOverlayVisible(false)}
      >
          <View>
             
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Headline>Select Date</Headline>
              </View>
          </View>
        <View style={{margin: 15}}>
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
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-evenly', marginVertical: 15}}>
            <View  style={{flex: 1, marginHorizontal: 15}} >
                <Button buttonStyle={{backgroundColor: colors.red}} title="Cancel" onPress={()=> setOverlayVisible(false)}/>
            </View>
            <View  style={{flex: 1, marginHorizontal: 15}} >
             <Button buttonStyle={{backgroundColor: colors.green}}  title="Save" onPress={()=> onSelectFilter()}/>
            </View>
        </View>
     
      </Overlay>
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
  text: {
    fontSize: 30
  },
  cardStyle : {
      borderRadius: 10,
    margin:10, 
    padding: 10,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
    
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  },
  chartFilter: {
    borderRadius: 20, 
    paddingVertical: 5,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
    
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: colors.accent, 
    paddingHorizontal: 10
  },
  textColor: {
    fontSize: 14,
    color: colors.black,
    textAlign:'center'
  },
  ColStyle: {
      width: 100,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.grey,
      paddingBottom: 5
  },
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
  backgroundColor: colors.accent},
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

export default SummaryReport;

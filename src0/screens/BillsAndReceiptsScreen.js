import React,{ useEffect, useState }  from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Modal, ScrollView } from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import colors from "../themes/colors";
import {  ListItem, Avatar} from "react-native-elements";
import { useStore } from "../context/StoreContext";
import moment from 'moment'
import formatMoney from 'accounting-js/lib/formatMoney.js'
import {DatePicker} from "react-native-common-date-picker";
import { ModalInputForm } from "../components/ModalInputForm";
import SearchInput, { createFilter } from 'react-native-search-filter';

import SegmentedControl from '@react-native-segmented-control/segmented-control';

const KEYS_TO_FILTERS = ['status'];
const BillsAndReceiptsScreen = ({navigation, route}) => {
  const store_data =  route.params.store
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedStoreInfo, setSelectedStoreInfo]= useState([]);
  const [custompick1, setCustomPicker1] = useState(false)
  const [custompick2, setCustomPicker2] = useState(false)
  const [specificDate, setSpecificDatePicker] = useState(false)
  const [specific_date, setSpecificDate] = useState('');
  const [filter, setFilter] = useState('Today')
  const [attendant, setAttendant] = useState('');
  const [attendant_info, setAttendantInfo] = useState([]);
  const [overlayVisible, setOverlayVisible]= useState(false)
  const [selected,setSelected] = useState(0)
  const today = moment().unix()
  const { 
   
    staffs,
    getCustomSales3,
   custom_transactions3
  } = useStore();

  const filteredProducts = custom_transactions3.filter(createFilter('Completed', KEYS_TO_FILTERS))

  const filteredVoidedProducts = custom_transactions3.filter(createFilter('Voided', KEYS_TO_FILTERS))
  useEffect(() => {
    let date = moment().unix()
    let today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
    getCustomSales3(store_data._id, today,attendant_info._id,  1)
  },[]);

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
          getCustomSales3(store_data._id, today,attendant_info._id,  1)
          setOverlayVisible(false)
          break;
  
        case "Yesterday":
      
          getCustomSales3(store_data._id, yesterday,attendant_info._id,  1)
          setOverlayVisible(false)
          break;
  
        case "This Week":
          getCustomSales3(store_data._id, `${thisweek+thisyear}`,attendant_info._id,   2)
          setOverlayVisible(false)
          break;
  
        case "Last Week":
          getCustomSales3(store_data._id, `${lastweek+thisyear}`, attendant_info._id, 2)
          setOverlayVisible(false)
          break;
  
        case "This Month":
          getCustomSales3(store_data._id, `${thismonth+thisyear}`, attendant_info._id,  3)
          setOverlayVisible(false)
          break;
  
        case "Last Month":
          getCustomSales3(store_data._id, `${lastmonth+thisyear}`,attendant_info._id,  3)
          setOverlayVisible(false)
          break;
  
        case "This Year":
          getCustomSales3(store_data._id, thisyear, attendant_info._id,  5)
          setOverlayVisible(false)
          break;
  
        case "Last Year":
          getCustomSales3(store_data._id, lastyear, attendant_info._id,  5)
          setOverlayVisible(false)
          break;
  
        default:
          getCustomSales3(store_data._id, filter,attendant_info._id,  1)
          setOverlayVisible(false)
          break;
      }
  
  }

  const renderView = () => {
    if(selected===0){
      return(
        <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
      )
    }
    if(selected===1){
     return(
      <FlatList
          data={filteredVoidedProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          />
     )
   }
  }

  const calculateTotal = () => {
    let total = 0
    filteredProducts.forEach(item => {
      total += item.total
    });
    return total;
  }

  const calculateVoidedTotal = () => {
    let total = 0
    filteredVoidedProducts.forEach(item => {
      total += item.total
    });
    return total;
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listStyle} onPress={()=> navigation.navigate('BillDetails', {transactions: item, store: store_data})}>
      <View style={{flexDirection: 'row'}}>
        <View style={{paddingRight: 10}}>
          <Avatar containerStyle={styles.avatarStyle} size={45} icon={{ name: 'receipt-outline', type: 'ionicon', color: colors.accent }}/>
        </View>
        <View>
          <Text style={{color: colors.coverDark, marginBottom: 3, fontWeight:'700', fontSize: 15}}>
            {item.timeStamp}
          </Text>
          <Text style={{color: colors.red, fontSize: 13}}>
            {moment.unix(item.timeStamp).format('DD MMM YYYY hh:mmA')}
          </Text>
        </View>
      </View>
      <View style={{justifyContent:'center', alignItems:'center'}}>
          
          <Text style={{fontSize: 17, color: colors.green, fontWeight: '700'}}>{formatMoney(item.total, { symbol: "₱", precision: 1 })}</Text>
          <Text style={{fontSize: 10, color: colors.boldGrey, textDecorationLine:'underline'}}>Tap to view >></Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
        <AppHeader 
          centerText="Bills and Receipts" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
          } 
          rightComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <Feather name={'printer'} size={25} color={colors.white}/>
            </TouchableOpacity>
          } 
          />
          <View style={{flexDirection:"column"}}>
        <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom: 5}}>
          <TouchableOpacity style={styles.filterStyle}>
          <ModalInputForm
                displayComponent={
                    <>
                        <Text style={{ color: colors.black,  fontWeight:'700'}}>{attendant.length === 0 ? "Select Attendant": attendant}</Text>
                    </>
                }
                title="Select Attendant"
                onSave={()=> onSelectFilter()}
              >
                <ScrollView>
                  {
                    staffs.map((item, index) => 
                    item.store_id === store_data._id &&
                      <TouchableOpacity style={item.name === attendant ? [styles.storeList,{ borderColor:colors.accent}] : styles.storeList} onPress={()=> {setAttendant(item.name), setAttendantInfo(item)}}>
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
      <View style={{flex: 1}}>
      <SegmentedControl
                style={{marginTop:10, backgroundColor: colors.boldGrey, marginHorizontal: 10}}
                values={[ 'Completed', 'Voided']}
                selectedIndex={selected}
                onChange={(event) => {
                setSelected(event.nativeEvent.selectedSegmentIndex)
                }}
            />
             {
              renderView()
            }
      </View>
   
      <View style={styles.bottomTotal}>
        <View style={{flex: 1}}>
        <Text style={{fontSize: 16, fontWeight:'700'}}>
              Total
            </Text>
        </View>
        <View>
        <Text style={{fontSize: 16, fontWeight:'700'}}>
                {
                  selected === 0 ?
                  formatMoney(calculateTotal(), { symbol: "₱", precision: 2 }) :
                  formatMoney(calculateVoidedTotal(), { symbol: "₱", precision: 2 })
                }
            </Text>
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
        
    </View>
  );
};

BillsAndReceiptsScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  
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
  bottomTotal : {
    position:'absolute', 
    bottom: 0, 
    flexDirection:"row", 
    justifyContent:'space-between', 
    padding: 10,
    backgroundColor: colors.accent,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 2,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 2,
  margin: 5,
  borderRadius: 5}
});

export default BillsAndReceiptsScreen;

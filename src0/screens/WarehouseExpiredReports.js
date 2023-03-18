import React,{ useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity,Modal } from "react-native";
import { Row, Col, Grid } from 'react-native-easy-grid';
import AppHeader from "../components/AppHeader";
import DataTable from "../components/DataTable";
import colors from "../themes/colors";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useStore } from "../context/StoreContext";
import { ModalInputForm } from "../components/ModalInputForm";
import {DatePicker} from "react-native-common-date-picker";
import moment from 'moment'

const WarehouseExpiredReport = ({ navigation }) => {
  const {  warehouse_expired, getWarehouseExpired } = useStore();
  const [filter, setFilter] = useState('Today')
  const [specificDate, setSpecificDatePicker] = useState(false)
  const [specific_date, setSpecificDate] = useState('');

  useEffect(() => {
    const date = moment().unix()
    const today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
    getWarehouseExpired(today, 1)
  },[]);

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
          getWarehouseExpired(today, 1)
          break;
  
        case "Yesterday":
      
          getWarehouseExpired(yesterday,  1)
          break;
  
        case "This Week":
          getWarehouseExpired( `${thisweek+'-'+thisyear}`,  3)
          break;
  
        case "Last Week":
          getWarehouseExpired(`${lastweek+'-'+thisyear}`, 3)
          break;
  
        case "This Month":
          getWarehouseExpired(`${thismonth+'-'+thisyear}`,  2)
          break;
  
        case "Last Month":
          getWarehouseExpired(`${lastmonth+'-'+thisyear}`, 2)
          break;
  
        case "This Year":
          getWarehouseExpired(thisyear,  5)
          break;
  
        case "Last Year":
          getWarehouseExpired( lastyear,  5)
          break;
  
        default:
          getWarehouseExpired(filter, 1)
          break;
      
    }

   
  }


  const calculateTotal = () => {
    let total = 0;

    warehouse_expired.forEach(item => {
        total += item.sprice*item.quantity;
    });

    return total;
  }
  const calculateTotalQty = () => {
    let total = 0;

    warehouse_expired.forEach(item => {
        total += item.quantity;
    });

    return total;
  }

  const renderItem = ({ item }) => (
      <Row style={{marginVertical: 5}}>     
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
              <Text  style={styles.textColor}>{item.date}</Text>
        </Col>   
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
              <Text  style={styles.textColor}>{item.product}</Text>
        </Col> 
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
              <Text  style={styles.textColor}>{item.quantity}</Text>
        </Col> 
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
              <Text  style={styles.textColor}>{item.sprice*item.quantity}</Text>
        </Col>
      </Row>
  )

 

  return (
    <View style={{ flex: 1 }}>
        <AppHeader 
          centerText="Expired Products" 
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
        
        <DataTable
          total={calculateTotal()}
          ototal={calculateTotalQty()}
          headerTitles={['Date', 'Product', 'Qty', 'Amount']}
          alignment="center"
        >
          <FlatList
                keyExtractor={(key) => key._id}
                data={warehouse_expired}
                renderItem={renderItem}
              />
        </DataTable>
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

WarehouseExpiredReport.navigationOptions = () => {
  return {
    headerShown: false
  };
}



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
  },
  ColStyle: {
    width: 120,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    paddingBottom: 5
}

});



export default WarehouseExpiredReport;
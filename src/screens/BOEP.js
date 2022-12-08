import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View , TouchableOpacity, FlatList, Modal} from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useAuth } from "../context/AuthContext";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import DataTable from "../components/DataTable";
import { useStore } from "../context/StoreContext";
import { ModalInputForm } from "../components/ModalInputForm";
import {DatePicker} from "react-native-common-date-picker";
import moment from 'moment'
import formatMoney from 'accounting-js/lib/formatMoney.js'
import { Grid, Col, Row } from "react-native-easy-grid";

const BOEPScreen = ({navigation, route}) => {

  const STORE =  route.params.store
const {user} = useAuth();
const { getExpired,
        expired, 
        getPullout,

        getBO,
        bo,
        getReturned,
        returned

      } = useStore();
const [term, setTerm] = useState('');
const [selected,setSelected] = useState(0);
const [filter, setFilter] = useState('Today')
  const [specificDate, setSpecificDatePicker] = useState(false)
  const [specific_date, setSpecificDate] = useState('');

useEffect(() => {
  const date = moment().unix()
  const today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
  getExpired(today, 1, STORE._id)
  getPullout(today, 1, STORE._id)
  getBO(today, 1, STORE._id)
  getReturned(today, 1, STORE._id)
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
        getExpired(today, 1, STORE._id)
        getPullout(today, 1, STORE._id)
        getBO(today, 1, STORE._id)
        getReturned(today, 1, STORE._id)
        break;

      case "Yesterday":
    
        getExpired(yesterday,  1, STORE._id)
        getPullout(yesterday,  1, STORE._id)
        getBO(yesterday,  1, STORE._id)
        getReturned(yesterday,  1, STORE._id)
        break;

      case "This Week":
        getExpired( `${thisweek+'-'+thisyear}`,  3, STORE._id)
        getPullout( `${thisweek+'-'+thisyear}`,  3, STORE._id)
        getBO( `${thisweek+'-'+thisyear}`,  3, STORE._id)
        getReturned( `${thisweek+'-'+thisyear}`,  3, STORE._id)
        break;

      case "Last Week":
        getExpired(`${lastweek+'-'+thisyear}`, 3, STORE._id)
        getPullout(`${lastweek+'-'+thisyear}`, 3, STORE._id)
        getBO(`${lastweek+'-'+thisyear}`, 3, STORE._id)
        getReturned(`${lastweek+'-'+thisyear}`, 3, STORE._id)
        break;

      case "This Month":
        getExpired(`${thismonth+'-'+thisyear}`,  2, STORE._id)
        getPullout(`${thismonth+'-'+thisyear}`,  2, STORE._id)
        getBO(`${thismonth+'-'+thisyear}`,  2, STORE._id)
        getReturned(`${thismonth+'-'+thisyear}`,  2, STORE._id)
        break;

      case "Last Month":
        getExpired(`${lastmonth+'-'+thisyear}`, 2, STORE._id)
        getPullout(`${lastmonth+'-'+thisyear}`, 2, STORE._id)
        getBO(`${lastmonth+'-'+thisyear}`, 2, STORE._id)
        getReturned(`${lastmonth+'-'+thisyear}`, 2, STORE._id)
        break;

      case "This Year":
        getExpired(thisyear,  5, STORE._id)
        getPullout(thisyear,  5, STORE._id)
        getBO(thisyear,  5, STORE._id)
        getReturned(thisyear,  5, STORE._id)
        break;

      case "Last Year":
        getExpired( lastyear,  5, STORE._id)
        getPullout( lastyear,  5, STORE._id)
        getBO( lastyear,  5, STORE._id)
        getReturned( lastyear,  5, STORE._id)
        break;

      default:
        getExpired(filter, 1, STORE._id)
        getPullout(filter, 1, STORE._id)
        getBO(filter, 1, STORE._id)
        getReturned(filter, 1, STORE._id)
        break;
    
  }

 
}

const calculateBOTotal = () => {
  let total = 0;
  bo.forEach(item => {
    total += item.quantity*item.sprice
  });
  return total;
}

const calculateReturnTotal = () => {
  let total = 0;
  returned.forEach(item => {
    total += item.total
  });
  return total;
}

const calculateExpiredTotal = () => {
  let total = 0;
  expired.forEach(item => {
    total += item.quantity*item.sprice
  });
  return total;
}

const renderReturned = ({ item }) => (
  <Row style={{marginVertical: 5}}>     
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{item.date}</Text>
    </Col>   
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{item.product_name}</Text>
    </Col> 
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{Math.round(item.quantity * 100) / 100}</Text>
    </Col> 
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{formatMoney(item.total, { symbol: "₱", precision: 2 })}</Text>
    </Col>
  </Row>
)

const renderBO = ({ item }) => (
  <Row style={{marginVertical: 5}}>     
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{item.date}</Text>
    </Col>   
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{item.product_name}</Text>
    </Col>  
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{Math.round(item.quantity * 100) / 100}</Text>
    </Col>
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{formatMoney(item.quantity*item.sprice, { symbol: "₱", precision: 2 })}</Text>
    </Col>
  </Row>
)

const renderExpired = ({ item }) => (
  <Row style={{marginVertical: 5}}>     
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{item.date}</Text>
    </Col>   
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{item.product}</Text>
    </Col> 
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{item.exp_date}</Text>
    </Col> 
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{Math.round(item.quantity * 100) / 100}</Text>
    </Col>
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{formatMoney(item.quantity*item.sprice, { symbol: "₱", precision: 2 })}</Text>
    </Col>
  </Row>
)

const renderPullout = ({ item }) => (
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
          <Text  style={styles.textColor}>{formatMoney(item.quantity*item.oprice, { symbol: "₱", precision: 2 })}</Text>
    </Col>
    <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
          <Text  style={styles.textColor}>{item.reason}</Text>
    </Col>
  </Row>
)

const onTabChange = (sterm) => {
  setTerm(sterm)
}

const renderView = () => {

  if(selected === 0){
    return(
      <DataTable
      total ={calculateBOTotal()}
      qty = {0}
      headerTitles={['Date/Time', 'Product', "QTY", "Total"]}
      alignment="center"
 >
      <FlatList
        keyExtractor={(key) => key._id}
        data={bo}
        renderItem={renderBO}
       
        />
 </DataTable>
    )
  }
  if(selected === 1){
    return(
      <DataTable
      total ={calculateExpiredTotal()}
      qty = {0}
      headerTitles={['Date/Time', 'Product', 'Exp. Date', "QTY", "Total"]}
      alignment="center"
 >
      <FlatList
        keyExtractor={(key) => key._id}
        data={expired}
        renderItem={renderExpired}
       
        />
 </DataTable>
    )
  }
  if(selected === 2){
    return(
      <DataTable
      total ={calculateReturnTotal()}
      qty = {0}
      headerTitles={['Date/Time', 'Product', "QTY", "Total"]}
      alignment="center"
 >
      <FlatList
        keyExtractor={(key) => key._id}
        data={returned}
        renderItem={renderReturned}
       
        />
 </DataTable>
    )
  }
}

  return(
    <View style={{flex: 1}}>
        <AppHeader 
        centerText="BOEP" 
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
    <SegmentedControl
                style={{marginTop:10, backgroundColor: colors.boldGrey, marginHorizontal: 10}}
                values={[ 'B.O', 'Expired', 'Return']}
                selectedIndex={selected}
                onChange={(event) => {
                setSelected(event.nativeEvent.selectedSegmentIndex)
                }}
            />
    {renderView()}
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
      paddingBottom: 5,
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

export default BOEPScreen;

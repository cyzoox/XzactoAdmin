import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View , TouchableOpacity, FlatList, Dimensions} from "react-native";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import colors from "../themes/colors";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useStore } from "../context/StoreContext";
import DataTable from "../components/DataTable";
import moment from 'moment'
import { Row, Col, Grid } from 'react-native-easy-grid';
import formatMoney from 'accounting-js/lib/formatMoney.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import {Divider, FAB, Portal, Provider, TextInput } from 'react-native-paper';
import { ModalInputForm } from "../components/ModalInputForm";
const { width, height } = Dimensions.get("window");
import uuid from 'react-native-uuid';
import { useAuth } from "../context/AuthContext";

const CustomerCreditDetails = ({navigation, route}) => {
  const {user} = useAuth();
    const { customer, store } = route.params;
    const {credits, getCustomCredits, createPayment,getCustomPayments,payment} = useStore();
    const [selected,setSelected] = useState(0)
    const [amount, setAmount] = useState(0);
    const [receipt, setReceipt] = useState(0);

    useEffect(() => {
        getCustomCredits(customer._id)
        getCustomPayments(customer._id)
      },[]);
    
    console.log(moment.unix(moment().unix()).format('MMMM DD, YYYY'))
    const onSave = () => {
      let date = moment().unix()
      let payment = {
        id: uuid.v4(),
        partition: `project=${user.id}`,
        timeStamp: moment().unix(),
        year :moment.unix(date).format('YYYY'),
        year_month :moment.unix(date).format('MMMM-YYYY'),
        year_week :moment.unix(date).format('WW-YYYY'),
        date: moment.unix(date).format('MMMM DD, YYYY'),
        customer_id: customer._id,
        customer_name: customer.name,
        received_by:'Admin',
        amount: parseFloat(amount),
        store_name: store.name,
        store_id: store._id,
        receipt_no: receipt
      }
      createPayment(payment)
    }

    const calculateTotalCredit = () => {
        let total = 0;
        credits.forEach(item => {
            total += item.total
        });
        return total;
    }

    const calculateTotalPayments = () => {
      let total = 0;
      payment.forEach(item => {
          total += item.amount
      });
      return total;
  }


    const returnCreditHistory = () => {
        if(selected === 0){
            return (
               <DataTable
               total ={calculateTotalCredit()}
               qty = {0}
               headerTitles={['Date/Time', 'Total', 'Attendant', "Action"]}
               alignment="center"
          >
               <FlatList
                 keyExtractor={(key) => key._id}
                 data={credits}
                 renderItem={renderCredit}
                
                 />
          </DataTable>
   
            );
        }
   
        if(selected === 1){
           return (
            <DataTable
            total ={calculateTotalPayments()}
            qty = {0}
            headerTitles={['Date/Time', 'Total',"Received By"]}
            alignment="center"
       >
            <FlatList
              keyExtractor={(key) => key._id}
              data={payment}
              renderItem={renderPayments}
             
              />
       </DataTable>
   
            );
        }
   
    }

    const renderCredit = ({ item }) => {
        return(
            <Row style={{marginVertical: 5}}>     
            <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
                <Text  style={styles.textColor}>{moment.unix(item.timeStamp).format("DD MMM YYYY hh:mmA")}</Text>
            </Col>  
            <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
                <Text  style={styles.textColor}>{formatMoney(item.total, { symbol: "₱", precision: 1 })}</Text>
            </Col>
            <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
                <Text  style={styles.textColor}>{item.attendant_name}</Text>
            </Col>   
            <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
                <TouchableOpacity onPress={()=> {}}>
                    <Text style={{textDecorationLine:'underline', color:colors.red, fontStyle:'italic'}}>View Details</Text>
                </TouchableOpacity>
        </Col>
        </Row>
        );   
      }

      const renderPayments = ({ item }) => {
        return(
            <Row style={{marginVertical: 5}}>     
            <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
                <Text  style={styles.textColor}>{moment.unix(item.timeStamp).format("DD MMM YYYY hh:mmA")}</Text>
            </Col>  
            <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
                <Text  style={styles.textColor}>{formatMoney(item.amount, { symbol: "₱", precision: 1 })}</Text>
            </Col>  
            <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
                <Text  style={styles.textColor}>{item.received_by}</Text>
            </Col>  
        </Row>
        );   
      }

  return(
      <View style={{flex: 1}}>
            <AppHeader 
          centerText="Credits Details" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
        />
        <Collapse>
                <CollapseHeader style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor: colors.coverDark, marginHorizontal: 10, borderRadius: 5}}>
                    <View style={{width:'100%'}}>
                        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={styles.textWithShadow}>{customer.name}</Text>
                        
                        <Text style={styles.textWithShadow}> {formatMoney( calculateTotalCredit()-calculateTotalPayments(), { symbol: "₱", precision: 1 })}</Text>
                        </View>
                        <Text style={styles.textWithShadowII}>{customer.address}</Text>
                        <Divider style={{backgroundColor: colors.white}} />
                        <Text style={{textAlign:'center', fontStyle:'italic', color:colors.white}}>Tap to expand</Text>
                    <View >
                   
                    
                  
                    </View>
                    </View>
                </CollapseHeader>
                <CollapseBody style={{marginTop: 2}}>
                    <Collapse>
                    <CollapseHeader style={{backgroundColor: colors.coverDark, marginHorizontal: 10, padding: 10, borderRadius:5}}>
                   
                   <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 5}}>
                       <View style={{flex: 1}}>
                          <ModalInputForm
                              displayComponent={
                                  <>
                                        <TouchableOpacity
                                              style={styles.fab}
                                              onPress={() => {}}
                                              >
                                              <Ionicons name={'md-wallet-outline'} size={25} color={colors.green}/>
                                          </TouchableOpacity>
                                          <Text style={{textAlign:'center', color: colors.white, fontSize: 15}}>Pay Credit</Text>
                                  </>
                              }
                              title="Make Payment" 
                              onSave={onSave}
                             >
                        
                            <TextInput
                                  mode="outlined"
                                  label="Amount"
                                  placeholder="Amount"
                                  onChangeText={(text)=> setAmount(text)}
                                  />
                             <TextInput
                                  mode="outlined"
                                  label="Receipt Number"
                                  placeholder="Receipt #"
                                  onChangeText={(text)=> setReceipt(text)}
                                  />      
                            </ModalInputForm>
                          
                       </View>
      
                   </View>
                    </CollapseHeader>
                    </Collapse>
                </CollapseBody>
                </Collapse>
        <SegmentedControl
                style={{marginTop:10, backgroundColor: colors.boldGrey, marginHorizontal: 10}}
                values={[ 'Credits', 'Payments']}
                selectedIndex={selected}
                onChange={(event) => {
                setSelected(event.nativeEvent.selectedSegmentIndex)
                }}
            />
            {returnCreditHistory()}
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  ColStyle: {
    width: 120,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingBottom: 5
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
modalView: {
  width : width /1.5,
  paddingHorizontal: 15,
  backgroundColor: "white",
  borderRadius: 20,
  paddingBottom: 15,
  paddingTop: 5,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
},
openButton: {
  backgroundColor: "#F194FF",
  borderRadius: 20,
  padding: 8,
  elevation: 2
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 10,
  paddingVertical: 10
},
closeBtn: {
    justifyContent : 'flex-end',
    alignItems: 'flex-end'
},
contentText: {
    paddingVertical: 10,
    marginBottom: 10,
    textAlign:'center'
},
fab: {

  borderRadius: 70,
  justifyContent:'center',
  alignItems:'center',
  marginHorizontal: 50,
  paddingVertical: 5,

},
item: {
  backgroundColor: "#f9c2ff",
  padding: 20,
  marginVertical: 8
},
header: {
  flexDirection: 'row',
  justifyContent:'space-between',
  backgroundColor: colors.primary
},
title: {
  fontSize: 24
},
textWithShadow:{
  textShadowColor: 'rgb(0,0,1)',
  textShadowOffset: {width: 1, height: 1},
  textShadowRadius: 0.5,
  color: colors.white, 
  fontWeight: '700', 
  fontSize: 20, 
  textAlign: 'center'
}, textColor:{
  fontSize: 12
},
textWithShadowII:{
  textShadowColor: 'rgb(0,0,1)',
  textShadowOffset: {width: 1, height: 1},
  textShadowRadius: 0.5,
  color: colors.white, 
  fontWeight: '500', 
  fontSize: 18, 
  textAlign: 'center'
}
});

export default CustomerCreditDetails;

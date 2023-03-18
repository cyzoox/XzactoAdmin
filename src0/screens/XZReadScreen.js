import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Picker, Dimensions, ScrollView } from "react-native";
import AppHeader from "../components/AppHeader";
import { ModalInputForm } from "../components/ModalInputForm";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { ListItem, Avatar, Overlay, Button, Divider } from 'react-native-elements'
import moment from 'moment'
import formatMoney from 'accounting-js/lib/formatMoney.js'
import { theme } from "../constants";
import SearchInput, { createFilter } from 'react-native-search-filter';
import Feather from 'react-native-vector-icons/Feather'
import { useStore } from "../context/StoreContext";



const KEYS_TO_FILTERS = ['attendant_name'];

const KEYS_TO_FILTERS2 = ['date','year_month','year_week','year'];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');

const XZReadScreen = ({navigation, route}) => {
    const info = route.params.info;
    const { 
        expenses,
        staffs,
        transactions,
        alltrdetails,
        getCustomTransaction,
      } = useStore();
         const [filter, setFilter] = useState('Today')
        const [specificDate, setSpecificDatePicker] = useState(false)
        const [specific_date, setSpecificDate] = useState('');
        const [selectedValue, setselectedValue] = useState('Today');
        const [visible, setVisible] = useState(false);
        const [selectedstaff, setSelectedStaff] = useState('');
        const [p_Visible, setPVisible] = useState(false);
        const [active, setActive] = useState('');
        const [term, setTerm] = useState('Completed');
        const [selected,setSelected] = useState(0)
        const [attendant,setAttendant ] = useState('');
        const [id, setAttendantID] = useState('');
        const [attendant_info, setAttendantInfo] = useState([]);
        const [selected_date, setSelectedDate] = useState('')

        const filteredProducts = alltrdetails.filter(createFilter(info._id, KEYS_TO_FILTERS))
        const filterProducts2 = filteredProducts.filter(createFilter(selected_date, KEYS_TO_FILTERS2))

        const date = moment().unix()
        const filteredCompletedProducts = transactions.filter(createFilter('Completed', KEYS_TO_FILTERS))

        useEffect(() => {
          let date = moment().unix()
          let today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
        {/*  getCustomTransaction('Today', {date : today}, store_info.attendant_id)*/}
          filterByCategory()
        },[]);

        const togglePOverlay = () => {
          setPVisible(!p_Visible);
        };

        const toggleOverlay = () => {
          setVisible(!visible);
        };
        
        
       
        
        const onSelectPersonnel = (item) => {
          setSelectedStaff(item)
          getFilteredTransactions(selectedValue)
          togglePOverlay()
        }



const getFilteredTransactions=(filter)=>{

  setselectedValue(filter)
  toggleOverlay()
  let date = moment().unix()
  let today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
  let yesterday = `${moment.unix(date).subtract(1, 'day').format('MMMM DD, YYYY')}`;
  let thisweek = moment.unix(date).format('WW-YYYY');
  let lastweek = `${moment.unix(date).format('WW')-1}`;
  let thismonth = `${moment.unix(date).format('MMMM-YYYY')}`;
  let lastmonth = `${moment.unix(date).subtract(1, 'month').format('MMMM-YYYY')}`;
  let thisyear = `${moment.unix(date).format('YYYY')}`;
  let lastyear = `${moment.unix(date).subtract(1, 'year').format('YYYY')}`;
  let lastdays = `${moment.unix(date).subtract(30, 'day').startOf('day')/ 1000}`;
  let endwith = `${moment.unix(date)/1000}`;

  switch(filter) {

    case 'Today':
      getCustomTransaction('Today', {date : today})
      setSelectedDate(today)
      break;

      case 'Yesterday':
        getCustomTransaction('Today', {date : yesterday})
        setSelectedDate(yesterday)
        break;

      case 'This Week':
        getCustomTransaction('This week', {date: thisweek})
        setSelectedDate(thisweek)
      break;

      case 'Last Week':
        getCustomTransaction('This week', {date: `${lastweek+'-'+thisyear}`})
        setSelectedDate(`${lastweek+'-'+thisyear}`)
      break;

      case 'This Month':
        getCustomTransaction('This month', {date: thismonth})
        setSelectedDate(thismonth)
      break;

      case 'Last Month':
        getCustomTransaction('This month', {date: lastmonth})
        setSelectedDate(lastmonth)
      break;

      case 'This Year':
        getCustomTransaction('This year', {date: thisyear})
        setSelectedDate(thisyear)
      break;

      case 'Last Year':
        getCustomTransaction('This year', {date: lastyear})
        setSelectedDate(lastyear)
      break;

  
    }

}

const calculateCompletedTotal = () => {
  let total=0;

  filteredCompletedProducts.forEach(item => {
    total += item.total;
  });

  return total;
}

const calculateVoidedTotal = () => {
  let total=0;

  filteredVoidedProducts.forEach(item => {
    total += item.total;
  });

  return total;
}



const filterByCategory = () => {
    const  filterArray = [...filteredProducts.reduce((r, o) => {
        const key = o.category;
        
        const item = r.get(key) || Object.assign({}, o, {
          quantity: 0,
          total: 0,
          category: ''
        });
        if(o.status === "Completed"){
        item.quantity += o.quantity;
        item.total += o.quantity * o.sprice;
        item.category = o.category;
        }
        return r.set(key, item);
      }, new Map).values()];

     return filterArray;
}


const filterByPaymentMethod = () => {
    const  filterArray = [...transactions.reduce((r, o) => {
        const key = o.payment_method;
        
        const item = r.get(key) || Object.assign({}, o, {
          total: 0,
          pm: '',
          items_sold:0
        });
        if(o.status === 'Completed'){
            item.total += o.total;
            item.pm = o.payment_method;
            item.items_sold += o.total_items
        }
        

        return r.set(key, item);
      }, new Map).values()];

     return filterArray;
}

const calculateTotalNetSalesByCategory = () => {
    let total = 0;
    filterByCategory().forEach(item => {
        total += item.total
    })
    return total;
}

const calculateTotalDiscount = () => {
    let total = 0;
    transactions.forEach(item => {
        if(item.status === "Completed"){
            total += item.discount
        }
       
    })
    return total;
}

const calculateTotalPayments = () => {
    let total = 0;
    filterByPaymentMethod().forEach(item => {
       
            total += item.total
        
     
    });
    return total;
}

const calculateSoldItems = () => {
    let total = 0;
    transactions.forEach(item => {
        if(item.attendant_id === id){
            if(item.status === "Completed"){
                total += item.total_items
            }
       
        }
    });
    return total;
}

const calculateTotalVoided = () => {
    let total = 0;
    transactions.forEach(item => {
        if(item.status === "Voided"){
            if(item.attendant_id === id){
                total += 1
            }
          
        }
       
    });
    return total;
}

const calculateTotalExpenses = () => {
    let total = 0;
    expenses.forEach(item => {
      if(item.attendant_id === id ){
        total += item.amount
      } 
    });
    return total;
}

   const keyExtractor = (item, index) => index.toString()
  return(
    <View style={{flex: 1}}>
    <AppHeader 
      centerText="Z Report"
      leftComponent={
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <EvilIcons name={'arrow-left'} size={35} color={colors.white}/>
          </TouchableOpacity>
      } 
    />
     <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
    <TouchableOpacity style={styles.filterStyle}>
    <ModalInputForm
          displayComponent={
              <View style={{flexDirection:"row"}}>
                 <Feather style={{textAlign:'center',paddingRight: 10}} name={'users'} size={25} color={colors.black}/>
                  <Text style={{paddingLeft:10, borderLeftWidth: 1,color: colors.black,  fontWeight:'700'}}>{attendant.length === 0 ? "Select Attendant": attendant}</Text>
              </View>
          }
          title="Select Attendant"
          onSave={()=> getFilteredTransactions('Today')}
        >
          <ScrollView>
            {
              staffs.map((item, index) => 
              item.status === 'Active' &&
                <TouchableOpacity style={item.name === attendant ? [styles.storeList,{ borderColor:colors.accent}] : styles.storeList} onPress={()=> {setAttendant(item.name), setAttendantInfo(item), setAttendantID(item._id)}}>
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
                <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                   <EvilIcons style={{textAlign:'center',paddingRight: 10}} name={'calendar'} size={33} color={colors.coverDark}/>
                    <Text style={{paddingLeft:10, borderLeftWidth: 1,color: colors.black,  fontWeight:'700'}}>{filter.length === 0? 'Select Date' : filter}</Text>
                </View>
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
    <ScrollView>
    <View style={styles.container}>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>Z Report</Text>
                </View>
                <View>
                  <Text style={styles.textTitle}>{moment.unix(date).format('MMMM DD, YYYY')}</Text>
                </View>
               
            </View>
            
            <Divider/>
          
            <View style={{flexDirection:'row',justifyContent:'center', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>SALES AND EXPENSES SUMMARY</Text>
                </View>
            </View>
            <Divider/>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={{width: 150}}>Total Net Sales</Text>
                </View>
                <View>
                  <Text style={{textAlign:'center'}}></Text>             
                </View>
                <View style={{width: 100}}>
                  <Text style={{textAlign:'center'}}>{formatMoney(calculateTotalPayments(), { symbol: "₱", precision: 2 })}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={{width: 150}}>Total Expenses</Text>
                </View>
                <View>
                  <Text style={{textAlign:'center'}}></Text>             
                </View>
                <View style={{width: 100}}>
                  <Text style={{textAlign:'center'}}>{formatMoney(calculateTotalExpenses(), { symbol: "₱", precision: 2 })}</Text>
                </View>
            </View>
            <Divider/>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>Total Sales</Text>
                </View>
                <View>
                  <Text style={styles.textTitle}></Text>
                </View>
                <View>
                  <Text style={[styles.textTitle,{width: 100, textAlign:'center'}]}>{formatMoney(calculateTotalPayments()-calculateTotalExpenses(), { symbol: "₱", precision: 2 })}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>SALES CATEGORIES</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={{width: 150}}>Categories</Text>
                </View>
                <View>
                  <Text style={{textAlign:'center'}}>Quantity</Text>             
                </View>
                <View style={{width: 100}}>
                  <Text style={{textAlign:'center'}}>Net Sales</Text>
                </View>
            </View>
            <Divider/>
            {
                filterByCategory().map(item => 
                  <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 2}}>
                  <View style={{width: 150}}>
                    <Text >{item.category}</Text>
                  </View>
                  <View>
                    <Text style={{textAlign:'center'}}>({Math.round(item.quantity * 100) / 100})</Text>
                  </View>
                  <View style={{width: 100}}>
                    <Text style={{textAlign:'center'}}>{formatMoney(item.total, { symbol: "₱", precision: 2 })}</Text>
                  </View>
              </View>
                )
            }
            
            <Divider/>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>Total Net Sales</Text>
                </View>
                <View>
                  <Text style={styles.textTitle}></Text>
                </View>
                <View>
                  <Text style={[styles.textTitle,{width: 100, textAlign:'center'}]}>{formatMoney(calculateTotalNetSalesByCategory(), { symbol: "₱", precision: 2 })}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>PAYMENT DETAILS</Text>
                </View>
            </View>
            <Divider/>
            {
                filterByPaymentMethod().map(item => 
                  <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 2}}>
                  <View >
                    <Text >{item.pm}</Text>
                  </View>
               
                  <View>
                    <Text style={[styles.textTitle,{width: 100, textAlign:'center'}]}>{formatMoney(item.total, { symbol: "₱", precision: 2 })}</Text>
                  </View>
              </View>
                )
            }
           
            <Divider/>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>Total Payments</Text>
                </View>
                <View>
                  <Text style={[styles.textTitle,{width: 100, textAlign:'center'}]}>{formatMoney(calculateTotalPayments(), { symbol: "₱", precision: 2 })}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row',justifyContent:'center', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>SALES DISCOUNTS</Text>
                </View>
            </View>
          
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={{width: 100, textAlign: 'center'}}>Discount Name</Text>
                </View>
                <View >
                  <Text style={{ textAlign: 'center'}}>Receipt No.</Text>
                </View>
                <View>
                  <Text style={{width: 100, textAlign: 'center'}}>Amount</Text>
                </View>
            </View>
            <Divider/>
            {
                transactions.map(item => 
                  item.status === "Completed" &&
                  <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 2}}>
                      <View >
                      <Text style={{width: 100, textAlign: 'center'}}>{item.discount_name}</Text>
                      </View>
                      <View >
                      <Text style={{textAlign: 'center'}}>{item.timeStamp}</Text>
                      </View>
                  
                      <View>
                      <Text style={{width: 100, textAlign: 'center'}}>{formatMoney(item.discount, { symbol: "₱", precision: 2 })}</Text>
                      </View>
                  </View>
                )
            }
          
            <Divider/>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>Total Discount</Text>
                </View>

                <View>
                  <Text style={[styles.textTitle, {width: 100, textAlign:'center'}]}>{formatMoney(calculateTotalDiscount(), { symbol: "₱", precision: 2 })}</Text>
                </View>
            </View>
            <Divider/>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>No. of Transaction</Text>
                </View>
                <View>
                  <Text style={[styles.textTitle, {width: 100, textAlign:'center'}]}>{filteredCompletedProducts.length}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>No. of Voided</Text>
                </View>
                <View>
                  <Text style={[styles.textTitle, {width: 100, textAlign:'center'}]}>{calculateTotalVoided()}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                <View >
                  <Text style={styles.textTitle}>Items Sold</Text>
                </View>
                <View>
                  <Text style={[styles.textTitle, {width: 100, textAlign:'center'}]}>{calculateSoldItems()}</Text>
                </View>
            </View>
         
          
        </View>
        </ScrollView>
</View>
  );
};


const styles = StyleSheet.create({
    text: {
      fontSize: 30
    },
    textColor: {
      fontSize: 12,
      color: colors.black,
      fontWeight:'600',
      textAlign:'center'
    },
    ColStyle: {
        width: windowWidth / 4.5 - 2,
        justifyContent: 'center',
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.charcoalGrey
    },
  voidStyle: {
              marginTop: 3,
              backgroundColor: colors.accent, 
              paddingHorizontal: 8, 
              paddingVertical: 1.5, 
              borderRadius: 10,
              shadowColor: "#EBECF0",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.10,
              shadowRadius: 2,
              elevation: 2,
            },
            header: {
              paddingHorizontal: theme.sizes.base * 2,
            },
            avatar: {
              height: theme.sizes.base * 2.2,
              width: theme.sizes.base * 2.2,
            },
            tabs: {
              paddingVertical: 5,
              paddingHorizontal: theme.sizes.base,
              justifyContent: 'center',
              alignItems:'center'
            },
            content: {
              borderBottomColor: theme.colors.gray2,
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginVertical: theme.sizes.base,
              marginHorizontal: theme.sizes.base * 2,
            },
            tab: {
              flex: 1,
              marginRight: theme.sizes.base * 2,
              paddingVertical: 5,
              paddingHorizontal: 15,   
              borderWidth: 2,
              borderColor: colors.accent,
              borderRadius: 8,
              width: '100%'
            },
            active: {
              backgroundColor: colors.accent,
              paddingVertical: 7,
              paddingHorizontal: 15,    
              borderRadius: 8
            },
            categories: {
              flexWrap: 'wrap',
              paddingHorizontal: theme.sizes.base,
              marginBottom: theme.sizes.base * 3.5,
            },
            category: {
              // this should be dynamic based on screen width
              minWidth: (width - (theme.sizes.padding * 5.5) - theme.sizes.base) / 2,
              maxWidth: (width - (theme.sizes.padding * 5.5) - theme.sizes.base) / 2,
              maxHeight: (width - (theme.sizes.padding * 5.5) - theme.sizes.base) / 2,
            },
            imageThumbnail: {
              justifyContent: 'center',
              alignItems: 'center',
              height: 120,
              width: width / 3.5,
              backgroundColor: 'gray',
            },
            MainContainer: {
              paddingLeft: 10,
              paddingRight:10,
              paddingBottom:10,
            },
            footer: {
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              overflow: 'visible',
              alignItems: 'center',
              justifyContent: 'center',
              height: height * 0.1,
              width,
              paddingBottom: theme.sizes.base * 4,
            },
            upperContainer: {
            paddingVertical: 10, 
            justifyContent:'center', 
            backgroundColor: colors.white,
             marginHorizontal: 10,
             shadowColor: "#EBECF0",
            shadowOffset: {
              width: 0,
              height: 5,
              
            },
            shadowOpacity: 0.89,
            shadowRadius: 2,
            elevation: 5,},
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
            container:{
                backgroundColor: colors.white,
                shadowColor: "#EBECF0",
                shadowOffset: {
                  width: 0,
                  height: 2,
                 
                },
                shadowOpacity: 0.89,
                shadowRadius: 2,
                elevation: 2,
                margin: 10,
                padding: 15
            },
        textTitle: {
            textAlign:'left', 
            fontSize: 15, 
            fontWeight:'700'
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
  });
  
export default XZReadScreen;

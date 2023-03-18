import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Picker, Dimensions, ScrollView } from "react-native";
import AppHeader from "../components/AppHeader";
import Spacer from "../components/Spacer";
import { ModalInputForm } from "../components/ModalInputForm";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import colors from "../themes/colors";
import { ListItem, Avatar, Overlay, Button, Divider } from 'react-native-elements'
import { useStore } from "../context/StoreContext";
import moment from 'moment'
import formatMoney from 'accounting-js/lib/formatMoney.js'
import { theme } from "../constants";
import SearchInput, { createFilter } from 'react-native-search-filter';


const KEYS_TO_FILTERS = ['status'];
const KEYS_TO_FILTERS2 = ['date'];
const KEYS_TO_FILTERS3 = ['store_id'];
const KEYS_TO_FILTERS4 = ['year_week'];
const KEYS_TO_FILTERS5 = ['year_month'];
const KEYS_TO_FILTERS6 = ['year'];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');
const SummaryReport = ({navigation, route}) => {
  const store_info =  route.params.store_info

    const { 
      transactions,
        alltrdetails,
        getCustomTransaction,
        store_delivery_summary,
        getStoreDeliverySummary,
        getCustomSales,
        getCustomExpenses2,
        expenses
        } = useStore();
        const [overlayVisible, setOverlayVisible] = useState(false);
        const [selectedValue, setselectedValue] = useState('Today');
        const [visible, setVisible] = useState(false);
        const [selectedstaff, setSelectedStaff] = useState('');
        const [p_Visible, setPVisible] = useState(false);
        const [active, setActive] = useState('');
        const [term, setTerm] = useState('Completed');
        const [selected,setSelected] = useState(0)
        const [attendant,setAttendant ] = useState('');
        const [id, setAttendantID] = useState(store_info._id);
        const [attendant_info, setAttendantInfo] = useState([]);
        const date = moment().unix()
        const filteredProducts = alltrdetails.filter(createFilter(store_info._id, KEYS_TO_FILTERS3))
        const filteredProducts2 = filteredProducts.filter(createFilter('Completed', KEYS_TO_FILTERS))
       const [custom_products, setCustomProducts] = useState([])
       const [custom_transactions, setCustomTransactions] = useState([])
       const [custom_expenses, setCustomExpenses] = useState([])
        const [filter, setFilter] = useState('Today')
        const filteredCompletedProducts = transactions.filter(createFilter('Completed', KEYS_TO_FILTERS))
        const filteredExpenses = expenses.filter(createFilter(store_info._id, KEYS_TO_FILTERS3))
      const[selected_filter, setSelectedFilter] = useState('Today')
    
        useEffect(() => {
          let date = moment().unix()
          let today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
          setCustomExpenses(filteredExpenses.filter(createFilter(today, KEYS_TO_FILTERS2)))
          setCustomProducts(alltrdetails.filter(createFilter(today, KEYS_TO_FILTERS2)))
          setCustomTransactions(transactions.filter(createFilter(today, KEYS_TO_FILTERS2)))
          getStoreDeliverySummary(today, 1)
         
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
  let lastweek = `${moment.unix(date).format('ww')-1}`;
  let thismonth = `${moment.unix(date).format('MMMM YYYY')}`;
  let lastmonth = `${moment.unix(date).subtract(1, 'month').format('MMMM YYYY')}`;
  let thisyear = `${moment.unix(date).format('YYYY')}`;
  let lastyear = `${moment.unix(date).subtract(1, 'year').format('YYYY')}`;
  let lastdays = `${moment.unix(date).subtract(30, 'day').startOf('day')/ 1000}`;
  let endwith = `${moment.unix(date)/1000}`;

  switch(filter) {

    case 'Today':
      getCustomTransaction('Today', {date : today}, store_info._id)
      break;
      case 'This week':
        getCustomTransaction('This week', {date: thisweek}, store_info._id)
      break;

    default:
      getCustomTransaction('Today', {date: today})
      break;
  
    }

}

const calculateTotalDelivery=()=>{
  let total=0;
  store_delivery_summary.forEach(item => {
    total += item.total;
  });
  
  return total;
}

const calculateCompletedTotal = () => {
  let total=0;

  filteredProducts.forEach(item => {
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

const onSelectFilter = () => {
  
  let date = moment().unix()
  let today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
  let yesterday = `${moment.unix(date).subtract(1, 'day').format('MMMM DD, YYYY')}`;
  let thisweek = `${moment.unix(date).format('ww')}`;
  let lastweek = `${moment.unix(date).format('ww')-1}`;
  let thismonth = `${moment.unix(date).format('MMMM-YYYY')}`;
  let lastmonth = `${moment.unix(date).subtract(1, 'month').format('MMMM-YYYY')}`;
  let thisyear = `${moment.unix(date).format('YYYY')}`;
  let lastyear = `${moment.unix(date).subtract(1, 'year').format('YYYY')}`;
  let lastdays = `${moment.unix(date).subtract(30, 'day').startOf('day')/ 1000}`;

  
    switch (filter) {
      case "Today":
        // getCustomSales(store_info._id, today, 1)
        // getCustomExpenses2(store_info._id, today,  1)
        setCustomExpenses(filteredExpenses.filter(createFilter(today, KEYS_TO_FILTERS2)))
        setCustomProducts(alltrdetails.filter(createFilter(today, KEYS_TO_FILTERS2)))
        setCustomTransactions(transactions.filter(createFilter(today, KEYS_TO_FILTERS2)))
        getStoreDeliverySummary(today, 1)
        setOverlayVisible(false)
        break;

      case "Yesterday":
    
        // getCustomSales(store_info._id, yesterday,  1)
        // getCustomExpenses2(store_info._id, yesterday,  1)
        setCustomExpenses(filteredExpenses.filter(createFilter(yesterday, KEYS_TO_FILTERS2)))
        setCustomProducts(alltrdetails.filter(createFilter(yesterday, KEYS_TO_FILTERS2)))
        setCustomTransactions(transactions.filter(createFilter(yesterday, KEYS_TO_FILTERS2)))
        getStoreDeliverySummary(yesterday, 1)
        setOverlayVisible(false)
        break;

      case "This Week":
        // getCustomSales(store_info._id, `${thisweek+'-'+thisyear}`,  3)
        // getCustomExpenses2(store_info._id, `${thisweek+'-'+thisyear}`,  3)
        setCustomExpenses(filteredExpenses.filter(createFilter(`${thisweek+'-'+thisyear}`, KEYS_TO_FILTERS4)))
        setCustomProducts(alltrdetails.filter(createFilter(`${thisweek+'-'+thisyear}`, KEYS_TO_FILTERS4)))
        setCustomTransactions(transactions.filter(createFilter(`${thisweek+'-'+thisyear}`, KEYS_TO_FILTERS4)))
        getStoreDeliverySummary(`${thisweek+'-'+thisyear}`, 3)
        setOverlayVisible(false)
        break;

      case "Last Week":
        // getCustomSales(store_info._id, `${lastweek+'-'+thisyear}`, 3)
        // getCustomExpenses2(store_info._id, `${lastweek+'-'+thisyear}`,  3)
        setCustomExpenses(filteredExpenses.filter(createFilter(`${lastweek+'-'+thisyear}`, KEYS_TO_FILTERS4)))
        setCustomProducts(alltrdetails.filter(createFilter(`${lastweek+'-'+thisyear}`, KEYS_TO_FILTERS4)))
        setCustomTransactions(transactions.filter(createFilter(`${lastweek+'-'+thisyear}`, KEYS_TO_FILTERS4)))
        getStoreDeliverySummary(`${thisweek+'-'+thisyear}`, 3)
        setOverlayVisible(false)
        break;

      case "This Month":
        // getCustomSales(store_info._id, `${thismonth+'-'+thisyear}`,  2)
        // getCustomExpenses2(store_info._id, `${thismonth+'-'+thisyear}`,  2)
        setCustomExpenses(filteredExpenses.filter(createFilter(thismonth, KEYS_TO_FILTERS5)))
        setCustomProducts(alltrdetails.filter(createFilter(thismonth, KEYS_TO_FILTERS5)))
        setCustomTransactions(transactions.filter(createFilter(thismonth, KEYS_TO_FILTERS5)))
        getStoreDeliverySummary(thismonth, 2)
        setOverlayVisible(false)
        break;
      case "Last Month":
        // getCustomSales(store_info._id, `${lastmonth+'-'+thisyear}`, 2)
        // getCustomExpenses2(store_info._id, `${lastmonth+'-'+thisyear}`,  2)
        setCustomExpenses(filteredExpenses.filter(createFilter(lastmonth, KEYS_TO_FILTERS5)))
        setCustomProducts(alltrdetails.filter(createFilter(lastmonth, KEYS_TO_FILTERS5)))
        setCustomTransactions(transactions.filter(createFilter(lastmonth, KEYS_TO_FILTERS5)))
        getStoreDeliverySummary(lastmonth, 2)
        setOverlayVisible(false)
        setSelectedFilter(filter)
        break;

      case "This Year":
        // getCustomSales(store_info._id, thisyear,  5)
        // getCustomExpenses2(store_info._id, thisyear,  5)
        setCustomExpenses(filteredExpenses.filter(createFilter(thisyear, KEYS_TO_FILTERS6)))
        setCustomProducts(alltrdetails.filter(createFilter(thisyear, KEYS_TO_FILTERS6)))
        setCustomTransactions(transactions.filter(createFilter(thisyear, KEYS_TO_FILTERS6)))
        getStoreDeliverySummary(thisyear, 5)
        setOverlayVisible(false)
        break;

      case "Last Year":
        // getCustomSales(store_info._id, lastyear,  5)
        // getCustomExpenses2(store_info._id, lastyear,  5)
        setCustomExpenses(filteredExpenses.filter(createFilter(lastyear, KEYS_TO_FILTERS6)))
        setCustomProducts(alltrdetails.filter(createFilter(lastyear, KEYS_TO_FILTERS6)))
        setCustomTransactions(transactions.filter(createFilter(lastyear, KEYS_TO_FILTERS6)))
        getStoreDeliverySummary(lastyear, 5)
        setOverlayVisible(false)
        break;

      default:
        // getCustomSales(store_info._id, filter, 1)
        // getCustomExpenses2(store_info._id, filter,  1)
        setCustomExpenses(filteredExpenses.filter(createFilter(today, KEYS_TO_FILTERS2)))
        setCustomProducts(alltrdetails.filter(createFilter(today, KEYS_TO_FILTERS2)))
        setCustomTransactions(transactions.filter(createFilter(today, KEYS_TO_FILTERS2)))
        setOverlayVisible(false)
        break;
    }

}

const filterByCategory = () => {
    const  filterArray = [...custom_products.reduce((r, o) => {
        const key = o.category;
        
        const item = r.get(key) || Object.assign({}, o, {
          quantity: 0,
          total: 0,
          category: '',
          status:''
        });
        if(o.status === "Completed" && o.store_id === store_info._id){
        item.quantity += o.quantity;
        item.total += o.quantity * (o.sprice+o.addon_price);
        item.category = o.category;
        item.status = o.status;
        }
        return r.set(key, item);
      }, new Map).values()];

     return filterArray;
}


const filterByPaymentMethod = () => {
    const  filterArray = [...custom_transactions.reduce((r, o) => {
        const key = o.payment_method;
        
        const item = r.get(key) || Object.assign({}, o, {
          total: 0,
          pm: '',
          items_sold:0
        });
        if(o.status == 'Completed' && o.store_id === store_info._id){
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
    custom_transactions.forEach(item => {
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
    custom_transactions.forEach(item => {
     
            if(item.status === "Completed"){
                total += item.total_items
            }
       
    });
    return total;
}

const calculateTotalVoided = () => {
    let total = 0;
    custom_transactions.forEach(item => {
        if(item.status === "Voided"){
  
                total += 1
          
          
        }
       
    });
    return total;
}

const calculateTotalExpenses = () => {
    let total = 0;
    custom_expenses.forEach(item => {

        total += item.amount
       
    });
    return total;
}

   const keyExtractor = (item, index) => index.toString()

  return(
    <View style={{flex: 1}}>
          <AppHeader 
            centerText="Summary Report"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={35} color={colors.white}/>
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
          <ScrollView>
          <View style={styles.container}>
                  <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                      <View >
                        <Text style={styles.textTitle}>Summary Report</Text>
                      </View>
                      <View>
                        <Text style={styles.textTitle}>{selected_filter}</Text>
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
                        <Text style={[styles.textTitle,{width: 100, textAlign:'center'}]}>{formatMoney(calculateTotalNetSalesByCategory()-calculateTotalDiscount(), { symbol: "₱", precision: 2 })}</Text>
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
                      custom_transactions.map(item => 
                        item.status === "Completed" && item.discount !== 0 &&
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
                  <View style={{flexDirection:'row',justifyContent:'center', paddingVertical: 10}}>
                      <View >
                        <Text style={styles.textTitle}>DELIVERY SUMMARY</Text>
                      </View>
                  </View>
                
                  <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                      <View >
                        <Text style={{width: 100, textAlign: 'center'}}>Delivery No.</Text>
                      </View>
                      <View >
                        <Text style={{ textAlign: 'center'}}>Supplier</Text>
                      </View>
                      <View>
                        <Text style={{width: 100, textAlign: 'center'}}>Amount</Text>
                      </View>
                  </View>
                  <Divider/>
                  {
                      store_delivery_summary.map(item => 
                 
                        <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 2}}>
                            <View >
                            <Text style={{width: 100, textAlign: 'center'}}>{item.delivery_receipt}</Text>
                            </View>
                            <View >
                            <Text style={{textAlign: 'center'}}>{item.supplier}</Text>
                            </View>
                        
                            <View>
                            <Text style={{width: 100, textAlign: 'center'}}>{formatMoney(item.total, { symbol: "₱", precision: 2 })}</Text>
                            </View>
                        </View>
                      )
                  }
                
                  <Divider/>
                  <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                      <View >
                        <Text style={styles.textTitle}>Total Deliveries</Text>
                      </View>

                      <View>
                        <Text style={[styles.textTitle, {width: 100, textAlign:'center'}]}>{formatMoney(calculateTotalDelivery(), { symbol: "₱", precision: 2 })}</Text>
                      </View>
                  </View>
                  <Divider/>
                  <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical: 10}}>
                      <View >
                        <Text style={styles.textTitle}>No. of Transaction</Text>
                      </View>
                      <View>
                        <Text style={[styles.textTitle, {width: 100, textAlign:'center'}]}>{custom_transactions.length}</Text>
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
  });
  

export default SummaryReport;

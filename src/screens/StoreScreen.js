import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, Dimensions, ScrollView, TouchableOpacity, Modal } from "react-native";
import AppHeader from "../components/AppHeader";
import CardTiles from "../components/CardTiles";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useRoute } from '@react-navigation/native';
import formatMoney from 'accounting-js/lib/formatMoney.js'
import moment from 'moment'
import {DatePicker} from "react-native-common-date-picker";


import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { useStore } from "../context/StoreContext";

const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFFFF",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};





const screenWidth = Dimensions.get("window").width;

const StoreScreens = ({ navigation, route }) => {
  const STORE =  route.params.storess
  const {products, transactions, getCustomSales, custom_transactions, expenses} = useStore();
  const [custompick2, setCustomPicker2] = useState(false)
  const [selected_year,setYear] = useState('')

  const year = moment().year();



  const calculateActualTotal = () => {
    let total = 0;

    products.forEach(item => {
      total += item.oprice*item.stock
    });

    return total;
  }

  const calculateStoreSale = () => {
    let total = 0;

    transactions.forEach(item => {
      if(item.store_id === STORE._id && item.status === 'Completed'){
        total += item.total
      }
      
    });

    return total;
  }


  
  const calculateStoreExpenses = () => {
    let total = 0;

    expenses.forEach(item => {
      if(item.store_id === STORE._id){
      total += item.amount
      }
    });

    return total;
  }

  const calculateSoldProducts = () => {
    let total = 0;

    transactions.forEach(item => {
      if(item.store_id === STORE._id && item.status === 'Completed'){
        total += item.total_items
      }
      
    });

    return Math.round(total * 100) / 100;
  }

  const saleChartData = () => {
    const label =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"]
    const holder = []
    custom_transactions.forEach(item => {
      let ym = item.year_month;
      let month = item.year_month

      if(item.year === selected_year){
        label.forEach(element => {
          if(ym.slice(0, ym.length -5) === element){
            if(item.status === "Completed"){
              holder.push({month: element, total: item.total})
            }
           
          }
        });
        
      }
    }); 
    return holder; 
  }

  const saleChartData2 = () => {
    let holder = {};
    const label =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"]
    let obj = []
    label.forEach(element => {
      let counter = 0;
      saleChartData().forEach(item => {
        if(item.month === element){
          counter += item.total
        }
       
      });
      obj.push(counter)
    });
    return obj;
  }

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"],
    datasets: [
      {
        data: saleChartData2()
      }
    ]
  };

  
  const calculateStocksTotal= () => {
    let total = 0;

    products.forEach(item => {
      total += item.sprice*item.stock
    });

    return total;
  }

  return (
    <View  style={{flex:1}}>
       <AppHeader  
        centerText= {`${STORE.name}`}
        leftComponent={
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
          </TouchableOpacity>
      }
   
        />
          {/* rightComponent={
        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=> navigation.goBack()}>
        <EvilIcons name={'bell'} size={30} color={colors.white}/>
        <Badge containerStyle={{marginTop:-5}} value="3" status="success" />
      </TouchableOpacity>
      }*/}
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
      <TouchableOpacity onPress={()=> navigation.navigate('StoreSales', {store: STORE})} style={{flex: 1,backgroundColor: colors.statusBarCoverLight, paddingVertical: 10, margin: 5, padding: 15, borderRadius: 10}}>
            <Text style={{fontSize: 15, fontWeight:'400', color: colors.white}}>Sales</Text>
            <Text style={{fontSize: 18, fontWeight:'700', color: colors.white}}>{formatMoney(calculateStoreSale(), { symbol: "₱", precision: 2 })}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Expenses', {store: STORE})} style={{flex: 1,backgroundColor: colors.red, paddingVertical: 10, margin: 5, padding: 15, borderRadius: 10}}>
            <Text style={{fontSize: 15, fontWeight:'400', color: colors.white}}>Expenses</Text>
            <Text style={{fontSize: 18, fontWeight:'700', color: colors.white}}>{formatMoney(calculateStoreExpenses(), { symbol: "₱", precision: 2 })}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
      <View style={{flex: 1,backgroundColor: colors.green, paddingVertical: 10, margin: 5, padding: 15, borderRadius: 10}}>
            <Text style={{fontSize: 15, fontWeight:'400', color: colors.white}}>Products Sold</Text>
            <Text style={{fontSize: 18, fontWeight:'700', color: colors.white}}>{calculateSoldProducts()}</Text>
        </View>
        <View style={{flex: 1,backgroundColor: colors.accent, paddingVertical: 10, margin: 5, padding: 15, borderRadius: 10}}>
            <Text style={{fontSize: 15, fontWeight:'400', color: colors.white}}>Returns/Refunds</Text>
            <Text style={{fontSize: 18, fontWeight:'700', color: colors.white}}>0.00</Text>
        </View>
      </View>
      <ScrollView style={{marginTop: 15}}>
      <View>
        <View style={styles.actualCapital}>
          <View>
              <Text style={{color: colors.white, fontWeight:'900', fontSize: 17, color: colors.accent, fontWeight:'700'}}>Remaining Stocks Capital</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
              <Text style={{color: colors.white, fontSize: 17, color: colors.accent, fontWeight:'700'}}>{formatMoney(calculateActualTotal(), { symbol: "₱", precision: 2 })}</Text>
          </View>
        </View>
        <View style={styles.capitalStocks}>
          <View>
              <Text style={{color: colors.white, fontWeight:'900', fontSize: 17, color: colors.accent, fontWeight:'700'}}>Remaining Stocks SRP</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
              <Text style={{color: colors.white, fontSize: 17, color: colors.accent, fontWeight:'700'}}>{formatMoney(calculateStocksTotal(), { symbol: "₱", precision: 2 })}</Text>
          </View>
        </View>       
      </View>
      <View>
        <View style={styles.chartContainer}>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical: 10, marginHorizontal: 10}}>
            <Text style={{fontWeight: '700', fontSize: 18}}>Sales</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <TouchableOpacity onPress={()=> setCustomPicker2(true)} style={styles.chartFilter}>
                <Text style={{color: colors.bgRoot, fontWeight:'700', }}>
                  {selected_year.length !== 0 ? selected_year : 'Select Year'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('StoreSales',{store: STORE})} style={styles.chartFilter}>
                <Text style={{color: colors.bgRoot, fontWeight:'700', }}>
                  Show All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal>
          <BarChart
            style={{borderRadius: 10}}
            data={data}
            width={1000}
            height={190}
            yAxisLabel="₱"
            chartConfig={chartConfig}
            verticalLabelRotation={0}
          />
          </ScrollView>
       
        </View>
      </View>
      
      
          <CardTiles
              rightTileText="Products"
              leftTileText="Reports"
              iconRightName='md-barcode-outline'
              iconLeftName='md-podium-outline'
              leftRouteName="Reports"
              rightRouteName="Products"
              centerTileText="Expenses"
              centerRouteName="Expenses"
              iconCenterName="document-text-outline"
              extraProps={STORE}
          />
          <CardTiles
              rightTileText="Attendants"
              leftTileText="Bills"
              iconRightName='md-people-circle-outline'
              iconLeftName='ios-receipt-outline'
              leftRouteName="BillsAndReceipt"
              rightRouteName="Staffs"
              centerTileText="Customers"
              centerRouteName="Customers"
              iconCenterName="md-people-circle-outline"
              extraProps={STORE}
          />
      
        </ScrollView>
        <Modal animationType={'slide'} visible={custompick2} transparent>
                   <View style={{ flex: 1 ,flexDirection: 'column', justifyContent: 'flex-end'}}>
                        <View style={{ height: "30%" ,width: '100%',  justifyContent:"center"}}>
                            <DatePicker
                                type="YYYY"
                                minDate={'2020-03-06'}
                                monthDisplayMode={'en-short'}
                                                    confirm={date => {
                                        setCustomPicker2(false),
                                        setYear(date)
                                        getCustomSales(STORE._id, date,  5)
                                    }}
                                    cancel={date => {
                                        setCustomPicker2(false)
                                    }}
                                titleText="Select Year"
                                cancelText="Cancel"
                                sty
                                toolBarStyle={{backgroundColor: colors.accent}}
                                /> 
                    </View>
                    </View>
          </Modal>
      </View>
  );
};

StoreScreens.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  chartFilter: {
    marginHorizontal: 5,
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
    paddingHorizontal: 13
  },
  chartContainer: {
    borderRadius: 10,
    width: screenWidth- 20, 
    marginHorizontal: 10, 
    backgroundColor:'#ffffff',
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
    
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 10
  },
  actualCapital: {
    flexDirection:'column', 
    marginHorizontal: 10,
    marginBottom: 5,
    padding: 10, 
    backgroundColor: colors.charcoalGrey, 
    borderRadius: 10,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
    
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  },
  capitalStocks: {
    flex: 1,
    flexDirection:'column', 
    marginHorizontal: 10,
    marginVertical: 5, 
    padding: 10, 
    backgroundColor: colors.charcoalGrey, 
    borderRadius: 10,
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

export default StoreScreens;

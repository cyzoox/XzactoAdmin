import React,{useState} from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Button, Overlay, Icon, ListItem } from 'react-native-elements';
import AppHeader from "../components/AppHeader";
import colors from "../themes/colors";
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import {DatePicker} from "react-native-common-date-picker";
import moment from 'moment'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Title,TextInput, Headline  } from "react-native-paper";

import { Dimensions } from "react-native";
import { useStore } from "../context/StoreContext";
const screenWidth = Dimensions.get("window").width;



const piedata = [
  {
    name: "Seoul",
    population: 215006878780,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 28000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Beijing",
    population: 5276,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "New York",
    population: 8538,
    color: "#000000",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Moscow",
    population: 119200,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

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


const OverAllReportScreen = ({navigation}) => {
  const { transactions, getTRDetails, tr_details , stores, staffs, getCustomSales, custom_transactions, getCustomExpenses4, custom_expenses4, getCustomSales4, custom_transactions4} = useStore();
  const [visible, setVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [checkbox1, setCheckbox1] =useState(false)
  const [filter, setFilter] = useState('Today')
  const [specificDate, setSpecificDatePicker] = useState(false)
  const [specific_date, setSpecificDate] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedStoreInfo, setSelectedStoreInfo]= useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };
  

  const store_arr = () => {
    let obj = []
    stores.forEach(item => {
      obj.push(item.name)
    });
    return obj;
  }
  

  const saleChartData = () => {
    const label =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"]
    const holder = []
    custom_transactions4.forEach(item => {
      let ym = item.year_month;
      let month = item.year_month
      if(item.year === '2022'){
        label.forEach(element => {
          if(ym.slice(0, ym.length -5) === element){
              holder.push({month: element, total: item.total})
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

  const storeSales = () => {
    const result = [...custom_transactions4.reduce((r, o) => {
      const key = o.store_id
      
      const item = r.get(key) || Object.assign({}, o, {
        store: key,
        total: 0,
      });
      
      item.total += o.total;
  
    
      return r.set(key, item);
    }, new Map).values()];

   
    
  return result;
  }

  const expenses = () => {
    const result = [...custom_expenses4.reduce((r, o) => {
      const key = o.store_id
      
      const item = r.get(key) || Object.assign({}, o, {
        store: key,
        amount: 0,
      });
      
      item.amount += o.amount;
  
    
      return r.set(key, item);
    }, new Map).values()];

   
    
  return result;
  }

  const expenses2 = () => {
    let holder = {};
    
    let obj = []
    stores.forEach(element => {
      let counter = 0;
      expenses().forEach(item => {
        if(item.store === element._id){
          counter += item.amount
        }
       
      });
      obj.push({ name: element.name,
      population: counter,
      color: generateColor(),
      legendFontColor: generateColor(),
      legendFontSize: 15})
    });
    return obj;
  }

  

  const storeSales2 = () => {
    let holder = {};
    
    let obj = []
    stores.forEach(element => {
      let counter = 0;
      storeSales().forEach(item => {
        if(item.store === element._id){
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
          getCustomSales4( today, 1)
          getCustomExpenses4(today,1)
          setOverlayVisible(false)
      
          break;
  
        case "Yesterday":
        
          getCustomSales4(yesterday, 1)
          getCustomExpenses4(yesterday,  1)
          setOverlayVisible(false)
        
          break;
  
        case "This Week":
          getCustomSales4(`${thisweek+thisyear}`, 2)
          getCustomExpenses4(`${thisweek+"-"+thisyear}`,  2)
          setOverlayVisible(false)
        
          break;
  
        case "Last Week":
          getCustomSales4( `${lastweek+"-"+thisyear}`,   2)
          getCustomExpenses4( `${lastweek+"-"+thisyear}`,  2)
          setOverlayVisible(false)
         
          break;
  
        case "This Month":
          getCustomSales4( `${thismonth+"-"+thisyear}`,   3)
          getCustomExpenses4(`${thismonth+"-"+thisyear}`,  3)
          setOverlayVisible(false)
         
          break;
  
        case "Last Month":
          getCustomSales4(`${lastmonth+"-"+thisyear}`,  3)
          getCustomExpenses4( `${lastmonth+thisyear}`, 3)
          setOverlayVisible(false)
         
          break;
  
        case "This Year":
          getCustomSales4( thisyear,  5)
          getCustomExpenses4( thisyear,  5)
          setOverlayVisible(false)
        
          break;
  
        case "Last Year":
          getCustomSales4( lastyear,  5)
          getCustomExpenses4(lastyear,  5)
          setOverlayVisible(false)
         
          break;
  
        default:
          getCustomSales4( filter, 1)
          getCustomExpenses4(filter,1)
   
          break;
      } 
  }



  return (
    <ScrollView style={{flex: 1}}>
       <AppHeader 
          centerText="Reports" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
          } 
          gradient

          />
      <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
         
          <TouchableOpacity onPress={()=> setOverlayVisible(true)} style={styles.filterSelection}>
            <Text>{filter.length === 0 ? 'Select Date' : filter}</Text>
          </TouchableOpacity>
      </View>
   
      <View>
        <View style={styles.chartContainer}>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical: 10, marginHorizontal: 10}}>
            <Text style={{fontWeight: '700', fontSize: 18}}>Sales</Text>
          </View>
          <ScrollView horizontal>
          <BarChart
            style={{borderRadius: 10}}
            data={data}
            width={800}
            height={190}
            yAxisLabel="₱"
            chartConfig={chartConfig}
            verticalLabelRotation={0}
          />
          </ScrollView>
        </View>
      </View>
      <View>
        <View style={styles.chartContainer}>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical: 10, marginHorizontal: 10}}>
            <Text style={{fontWeight: '700', fontSize: 18}}>Expenses</Text>
           
          </View>
          <ScrollView horizontal>
          <PieChart
            data={expenses2()}
            width={450}
            height={200}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"0"}
            center={[0, 0]}
            absolute
          />
          </ScrollView>
         
        </View>
        
      </View>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "85%" }}
        onBackdropPress={() => setOverlayVisible(false)}
       
      >
          <View style={{marginBottom: 5}}>
             
             <View style={{flexDirection: 'row', justifyContent: 'center'}}>
             <Headline>Select Date</Headline>
             </View>
         </View>
         <View style={{marginVertical: 10}}>
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight:'700'}}>Custom Date</Text>
              </View>
          <View style={{justifyContent:'space-evenly', flexDirection:'row'}}>
                <TouchableOpacity style={filter === 'Today' ? styles.dateFilter : [styles.dateFilter,{backgroundColor: colors.white}]} onPress={()=> {setFilter("Today")}}>
               
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
              <TouchableOpacity style={{flex: 1,borderWidth: 1, flexDirection:'row', alignItems:'center', flex: 1, marginHorizontal: 2, justifyContent:'center'}}onPress={() => setSpecificDatePicker(true)}>
              <EvilIcons name={'calendar'} size={30} color={colors.boldGrey}/>
               <Text style={{flex: 1,fontSize:15, fontWeight:'900', textAlign:'center', paddingVertical: 5, paddingHorizontal:3}}>
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
              <View>
                <TouchableOpacity onPress={()=> onSelectFilter()}>
                  <Text>Save</Text>
                </TouchableOpacity>
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
                                       setOverlayVisible(false)
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
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
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
    paddingHorizontal: 13
  },
  chartContainer: {
flex: 1,
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
  filterSelection: {
    flex: 1,
    borderRadius: 10, 
    flexDirection:'row', 
    justifyContent:'center', 
    marginVertical: 5, 
    marginHorizontal: 10, 
    paddingVertical:10,
    backgroundColor:'#ffffff',
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
    
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,}
});

export default OverAllReportScreen;

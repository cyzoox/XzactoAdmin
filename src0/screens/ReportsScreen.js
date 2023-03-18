import React from "react";
import { Text, StyleSheet, View, TouchableOpacity,ScrollView} from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import {  ListItem, Avatar} from "react-native-elements";
import { useRoute } from "@react-navigation/native";





const ReportsScreen = ({navigation}) => {
  const route = useRoute();
  const STORE =  route.params.store

  
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (
    <View style={{flex: 1}}>
        <AppHeader 
          centerText="Reports" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
        />
      
        <ScrollView style={{flex: 1, marginBottom: 10}}>
        <ListItem underlayColor='#f1f1f1' onPress={()=> navigation.navigate('SummaryReports', {store: STORE})} containerStyle={styles.buttonStyle} bottomDivider>
        <Avatar size='medium'  source={require('../../assets/chart2.png')}/>
        <ListItem.Content >
          <ListItem.Title>Reports Summary</ListItem.Title>

        </ListItem.Content>
      </ListItem>
      <ListItem underlayColor='#f1f1f1' onPress={()=> navigation.navigate('DeliveryStockReports', {store: STORE})} containerStyle={styles.buttonStyle}  bottomDivider>
      <Avatar size='medium'  source={require('../../assets/chart2.png')}/>
        <ListItem.Content>
          <ListItem.Title>Delivery Stock Report</ListItem.Title>

        </ListItem.Content>
      </ListItem>
      <ListItem underlayColor='#f1f1f1' onPress={()=> navigation.navigate('BOEP', {store: STORE})} containerStyle={styles.buttonStyle} bottomDivider>
      <Avatar size='medium'  source={require('../../assets/chart2.png')}/>
        <ListItem.Content>
          <ListItem.Title>Pullout / Expired Report</ListItem.Title>
 
        </ListItem.Content>
      </ListItem>
      <ListItem underlayColor='#f1f1f1' onPress={()=> navigation.navigate('Inventory', {info: STORE})} containerStyle={styles.buttonStyle}  bottomDivider>
      <Avatar size='medium'  source={require('../../assets/chart2.png')}/>
        <ListItem.Content>
          <ListItem.Title>Remaining Stock Report</ListItem.Title>
   
        </ListItem.Content>
      </ListItem>
      <ListItem underlayColor='#f1f1f1' onPress={()=> navigation.navigate('TopSeller', {info: STORE})} containerStyle={styles.buttonStyle}  bottomDivider>
      <Avatar size='medium'  source={require('../../assets/chart2.png')}/>
        <ListItem.Content>
          <ListItem.Title>Top Selling Products</ListItem.Title>

        </ListItem.Content>
      </ListItem>
    {/* <ListItem underlayColor='#f1f1f1' onPress={()=> navigation.navigate('XZRead', {info: STORE})} containerStyle={styles.buttonStyle}  bottomDivider>
     <Avatar size='medium'  source={require('../../assets/chart2.png')}/>
        <ListItem.Content>
          <ListItem.Title>XZ Read</ListItem.Title>
          <ListItem.Subtitle>Subtitle</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>*/}
        </ScrollView>
        
    </View>
  );
};

ReportsScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  buttonStyle: {
    justifyContent:'center',
    alignContent:'center',
    marginTop: 5,
    marginBottom: 5,
     marginHorizontal: 10, 
     borderRadius: 25
  },
  avatarStyle: {
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor:'gray'
  }
});

export default ReportsScreen;

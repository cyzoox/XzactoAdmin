import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Modal} from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import { Button, Card, Text } from "react-native-elements";
import { Col, Grid, Row } from "react-native-easy-grid";
import colors from "../themes/colors";
import {DatePicker} from "react-native-common-date-picker";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AppHeader from "./AppHeader";
import { useNavigation } from '@react-navigation/native';

const FilterModal = () => {
    const navigation = useNavigation();
    const [date, setDate] = useState('');
    const [filterModal, setModal] = useState(false);
    const [selected , setSelected] = useState('');
    const [picker, setPicker] = useState(false);
    const [custompick, setCustomPicker] = useState(false);

    

  return (
    <View style={{flex:1}}>
    <TouchableOpacity  onPress={()=> setModal(true)}>
        <Fontisto name="equalizer" size={20} color={"white"}/> 
    </TouchableOpacity>
    <Modal
            animationType="slide"
            presentationStyle ={"fullScreen"}
            visible={filterModal}
            onRequestClose={() => {
               setModal(false)
            }}
            >
        <AppHeader 
            centerText="Filter Modal"
            leftComponent={
                <TouchableOpacity onPress={()=> setModal(false)}>
                    <EvilIcons name={'close-o'} size={30} color={colors.white}/>
                </TouchableOpacity>
            }
        />
           <Card transparent>
               <TouchableOpacity onPress={() => setPicker(true)}>
               <Text style={{fontSize:18, fontWeight:'900', textAlign:'center'}}>
                       Select Specific Date
                   </Text>
               </TouchableOpacity>
                   
                   <Modal animationType={'slide'} visible={picker} transparent>
                   <View style={{ flex: 1 ,flexDirection: 'column', justifyContent: 'flex-end'}}>
                        <View style={{ height: "30%" ,width: '100%',  justifyContent:"center"}}>
                            <DatePicker
                                minDate={'2020-03-06'}
                                                    confirm={date => {
                                        setPicker(false)
                                    }}
                                    cancel={date => {
                                        setPicker(false)
                                    }}
                                titleText="Select Date"
                                cancelText="Cancel"
                                toolBarStyle={{backgroundColor: colors.boldGrey}}
                                /> 
                    </View>
                    </View>
                    </Modal>
            
           </Card>
           <Card transparent>
               <TouchableOpacity onPress={() => setCustomPicker(true)}>
               <Text style={{fontSize:18, fontWeight:'900', textAlign:'center'}}>
                       Custom Date
                   </Text>
               </TouchableOpacity>
                   
                   <Modal animationType={'slide'} visible={custompick} transparent>
                   <View style={{ flex: 1 ,flexDirection: 'column', justifyContent: 'flex-end'}}>
                        <View style={{ height: "30%" ,width: '100%',  justifyContent:"center"}}>
                            <DatePicker
                                minDate={'2020-03-06'}
                                                    confirm={date => {
                                        setCustomPicker(false)
                                    }}
                                    cancel={date => {
                                        setCustomPicker(false)
                                    }}
                                titleText="Select Date"
                                cancelText="Cancel"
                                toolBarStyle={{backgroundColor: colors.boldGrey}}
                                /> 
                    </View>
                    </View>
                    </Modal>
            
           </Card>
           <Grid>
               <Row style={[selected != 'Last 30 days' ? styles.borderStyle : styles.borderStyleSelected]}>
                   <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', }}   onPress={()=> setSelected('Last 30 days')} >
                    <Text style={styles.textStyle}>Last 30 days</Text>       
                   </TouchableOpacity>   
               </Row>
               <Row>
                <Col size={1} style={[selected != 'Today' ? styles.borderStyle : styles.borderStyleSelected]}>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', }}  onPress={()=> setSelected('Today')}  >
                        <Text style={styles.textStyle}>
                            Today
                        </Text>
                    </TouchableOpacity> 
                </Col>
                <Col size={1} style={[selected != 'Yesterday' ? styles.borderStyle : styles.borderStyleSelected]}>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', }}   onPress={()=> setSelected('Yesterday')}  >
                        <Text style={styles.textStyle}>
                            Yesterday
                        </Text>
                    </TouchableOpacity> 
                </Col>
                </Row>
                <Row>
                <Col size={1} style={[selected != 'This week' ? styles.borderStyle : styles.borderStyleSelected]}>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', }}   onPress={()=> setSelected('This week')}  >
                        <Text style={styles.textStyle}>
                            This week
                        </Text>
                    </TouchableOpacity> 
                </Col>
                <Col size={1} style={[selected != 'Last week' ? styles.borderStyle : styles.borderStyleSelected]}>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', }}   onPress={()=> setSelected('Last week')}  >
                        <Text style={styles.textStyle}>
                            Last week
                        </Text>
                    </TouchableOpacity> 
                </Col>
                </Row>
                <Row>
                <Col size={1} style={[selected != 'This month' ? styles.borderStyle : styles.borderStyleSelected]}>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', }}   onPress={()=> setSelected('This month')}  >
                        <Text style={styles.textStyle}>
                            This month
                        </Text>
                    </TouchableOpacity> 
                </Col>
                <Col size={1} style={[selected != 'Last month' ? styles.borderStyle : styles.borderStyleSelected]}>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', }}   onPress={()=> setSelected('Last month')}  >
                        <Text style={styles.textStyle}>
                            Last month
                        </Text>
                    </TouchableOpacity> 
                </Col>
                </Row>
                <Row>
                <Col size={1} style={[selected != 'This year' ? styles.borderStyle : styles.borderStyleSelected]}>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', }}   onPress={()=> setSelected('This year')} >
                        <Text style={styles.textStyle}>
                            This year
                        </Text>
                    </TouchableOpacity> 
                </Col>
                <Col size={1} style={[selected != 'Last year' ? styles.borderStyle : styles.borderStyleSelected]}>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', }}   onPress={()=> setSelected('Last year')} >
                        <Text style={styles.textStyle}>
                            Last year
                        </Text>
                    </TouchableOpacity> 
                </Col>
                </Row>
           </Grid>

              <View style={{paddingHorizontal: 5, marginVertical: 8,}}>
                {
                  date ?
                  <Button
                  onPress={()=> this.onSelectDate()}
                  title="Apply Filter"
                  color={colors.primary}
                  accessibilityLabel="Learn more about this purple button"
                  />
                  :
                  <Button
                onPress={()=> this.onSelect()}
                title="Apply Filter"
                color={colors.primary}
                accessibilityLabel="Learn more about this purple button"
                />
                }
              
              </View>
        </Modal>
</View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    fontWeight:'bold',
    color: colors.statusBarCoverDark
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-start',
},
borderStyle: {
    backgroundColor: colors.grey,
    borderRadius: 10,
    margin: 5
},
  borderStyleSelected:{
    borderColor:colors.primary, 
    borderWidth:2,
    backgroundColor: colors.grey,
    borderRadius: 10,
    margin: 5
  }
});

export default FilterModal;

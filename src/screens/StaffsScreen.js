import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { AddStaff } from "../components/AddStaff";
import { useStore } from "../context/StoreContext";
import { ListItem, Avatar, CheckBox, Overlay, Button } from 'react-native-elements'
import { TextInput } from "react-native-paper";

const StaffsScreen = ({navigation, route}) => {
  const STORE =  route.params.store

  const { 
    createStaff,
    staffs,
    updateStaff
  } = useStore();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [selected,setSelected] = useState('')
  const [item,setItem] = useState([]);
  const keyExtractor = (item, index) => index.toString()

  const onEditStaff = (item) => {
    setName(item.name)
    setPassword(item.password)
    setItem(item)
    if(item.status === 'Active'){
      setCheck1(true)
      setSelected('Active')
    }else{
      setCheck2(true)
      setSelected('Inactive')
    }
    setOverlayVisible(true)
  }
  console.log(staffs)
  const renderItem = ({ item }) => (
    item.store_id === STORE._id &&
    <ListItem underlayColor='#f1f1f1' onPress={()=> onEditStaff(item)} bottomDivider containerStyle={styles.listStyle}>
    <Avatar containerStyle={{
          borderColor: 'grey',
          borderStyle: 'solid',
          borderWidth: 1,
          borderRadius: 20,
          backgroundColor:colors.white
        }} size={50} source={require('../../assets//xzacto_icons/iconsstore/cashier.png')}/>
<ListItem.Content>
  <ListItem.Title>{item.name}</ListItem.Title>
</ListItem.Content>
<View>
  <Text style={item.status === 'Active'?{fontSize: 15, fontWeight:'700', color:colors.green}: {fontSize: 15, fontWeight:'700', color:colors.red}}>{item.status}</Text>
</View>
</ListItem>
  )

  return (
    <View>
        <AppHeader 
          centerText="Staffs" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
        rightComponent={
          <AddStaff createStaff={createStaff} store={STORE}/>
        }
          />
         <FlatList
        keyExtractor={keyExtractor}
        data={staffs}
        renderItem={renderItem}
      />
        <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "70%" , paddingHorizontal: 30, paddingBottom: 20, paddingTop:15}}
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <>
        <Text style={{textAlign:'center', fontSize: 18, fontWeight:'700', marginBottom:10}}>Edit Staff Details</Text>
          <TextInput
          mode="outlined"
          value={name}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
           
          />
          <TextInput
          mode="outlined"
          value={password}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
         
            maxLength={6}
          />

          <View style={{flexDirection:'row', marginLeft: -10}}>
          <CheckBox
              textStyle={{fontSize:10}}
              title="Active"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={check1}
              onPress={() => {setCheck1(!check1), setSelected('Active'), setCheck2(false)}}
            />
            <CheckBox
              textStyle={{fontSize:10}}
              title="Inactive"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={check2}
              onPress={() => {setCheck2(!check2), setSelected('Inactive'),setCheck1(false)}}
            />
          </View>
          <Button
            title="Save"
            buttonStyle={{marginTop: 20, backgroundColor: colors.accent}}
            onPress={() => {
              setOverlayVisible(false);
              updateStaff(item,{name: name, password: password, status: selected})
            }}
          />
        </>
      </Overlay>
    </View>

  );
};

StaffsScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  listStyle: {
    flex:1,
    height: 75,
    backgroundColor: colors.white, 
    marginHorizontal: 15,
    paddingHorizontal: 15, 
    marginBottom: 10,
    marginTop: 10, 
    borderRadius: 15, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    paddingHorizontal: 10, 
    alignItems:'center',
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

export default StaffsScreen;

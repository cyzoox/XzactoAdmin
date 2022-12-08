import React, { useState } from "react";
import { Overlay, Input, Button } from "react-native-elements";
import {TouchableOpacity} from 'react-native';
import styles from "../../stylesheet";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useAuth } from "../context/AuthContext";
import {Picker} from '@react-native-picker/picker';
import moment from 'moment'
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddExpenses({ createExpenses, store }) {
  const { user } = useAuth();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const onSave = () => {
    let date = moment().unix()
    let expense = {
      partition: `project=${user.id}`,
      description: description,
      amount: parseFloat(amount),
      category: category,
      store_id: store.uid,
      attendant: "Admin",
      attendant_id: "Admin",
      date: [moment.unix(date).format('MMMM DD, YYYY'),moment.unix(date).format('MMMM'), moment.unix(date).format('MMMM YYYY'), moment.unix(date).format('YYYY'), moment.unix(date).format('ww')] ,
    }

    createExpenses(expense)
  }

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "90%" }}
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <>
          <Input
            placeholder="Description"
            onChangeText={(text) => setDescription(text)}
            autoFocus={true}
          />
           <Input
            placeholder="Category"
            onChangeText={(text) => setCategory(text)}
            autoFocus={true}
          />
           <Input
            placeholder="Amount"
            onChangeText={(text) => setAmount(text)}
            autoFocus={true}
          />
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);
              onSave()
            }}
          />
        </>
      </Overlay>
      <TouchableOpacity onPress={()=>setOverlayVisible(true)}>
            <EvilIcons  name={'plus'} size={30} color={colors.white}/>
      </TouchableOpacity>
    </>
  );
}

import React, { useState } from "react";
import { Overlay, Input, Button } from "react-native-elements";
import styles from "../../stylesheet";

// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddStore({ createStore }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [branch, setBranch] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onCreateStore = () => {
    if(password !== confirmPassword){
      alert('Password doesnt match.')
      return;
    }
    createStore(newTaskName, branch, password);
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
            placeholder="New Store Name"
            onChangeText={(text) => setNewTaskName(text)}
            autoFocus={true}
          />
          <Input
            placeholder="Branch"
            onChangeText={(text) => setBranch(text)}
            autoFocus={true}
          />
          <Input
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            autoFocus={true}
            secureTextEntry
            maxLength={6}
          />
          <Input
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            autoFocus={true}
            secureTextEntry
            maxLength={6}
          />
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);
              onCreateStore()
            }}
          />
        </>
      </Overlay>
      <Button
        type="clear"
        titleStyle={styles.plusButton}
        title="&#x2b;"
        onPress={() => {
          setOverlayVisible(true);
        }}
      />
    </>
  );
}

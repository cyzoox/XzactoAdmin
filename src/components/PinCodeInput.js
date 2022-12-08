import React from 'react';
import SimplePin from 'react-native-simple-pin'
import { Alert } from 'react-native'

const PinCodeInput = ({}) => (
    <SimplePin
        pin={[1,2,3,4,5,6]}
        title="Set my very secret PIN"
        repeatTitle="Repeat your PIN"
        onSuccess={(pin) => Alert.alert(
            'Success',
            'Hell yeah! Your PIN is ' + pin,
            [
                { text: 'OK' },
            ]
        )}
        onFailure={() => Alert.alert(
            'Failure',
            'Please, try again',
            [
                { text: 'OK' },
            ]
        )}
        titleStyle={{ fontSize: 23 }}
        numpadTextStyle={{ fontSize: 27 }}
        bulletStyle={{fontSize:25}}
    />
)

export default PinCodeInput
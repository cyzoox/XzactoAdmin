import React,{useEffect} from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import colors from "../themes/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen = ({navigation}) => {

    useEffect(() => {

        async function fetchData() {
             // If there is a user logged in, go to the Projects page.
        // AnimatedSplash.hide()
        const doneOnboarding = await AsyncStorage.getItem('OnBoarding')
        console.log(doneOnboarding)
        if(doneOnboarding != null ){
               navigation.navigate('Login')
        }
          }
          fetchData();
    
    
      });

    const onDoneBoarding = async() => {
        await AsyncStorage.setItem('OnBoarding', 'Done' )
        navigation.navigate('Login')
    }

  return(
    <View style={{flex: 1}}>
        <Onboarding
        onDone={()=> onDoneBoarding()}

            pages={[
                {
                backgroundColor: colors.compliment,
                image: <Image style={{height: 200, width:200}} source={require('../../assets/ob2.png')} />,
                title: 'Welcome to Xzacto',
                titleStyles:{color: colors.primary},
                subtitle: 'Manage and track your sales.',
                },
                {
              
                 backgroundColor: colors.primary,
                image: <Image style={{height: 200, width:200}} source={require('../../assets/ob3.png')} />,
                title: 'Get insights from your stats',
                subtitle: 'Work with dashboards to make the best business decisions.',
                }
            ]}
            />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default OnboardingScreen;

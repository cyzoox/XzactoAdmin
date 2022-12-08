import React, { useState } from 'react';
import {Platform, ScrollView, StyleSheet, View, Button,Dimensions, RefreshControl, Text, TouchableOpacity} from 'react-native';
import {PurchaseError, requestSubscription, useIAP} from 'react-native-iap';
import colors from '../themes/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Subscription = () => {
  const {connected, subscriptions, getSubscriptions} = useIAP();
  const [refreshing, setRefreshing] = useState(false);
  
console.log(subscriptions)
  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({skus: ['standard_tier_001']});
    } catch (error) {
      console.log(error)
    }
  };

  const handleBuySubscription = async (
    productId= "",
    offerToken = ""
  ) => {
    if (Platform.OS === 'android' && !offerToken) {
      console.warn(
        `There are no subscription Offers for selected product (Only requiered for Google Play purchases): ${productId}`,
      );
    }
    try {
      await requestSubscription({
        sku: productId,
        ...(offerToken && {
          subscriptionOffers: [{sku: productId, offerToken}],
        }),
      });
    } catch (error) {
      if (error instanceof PurchaseError) {
        errorLog({message: `[${error.code}]: ${error.message}`, error});
      } else {
        errorLog({message: 'handleBuySubscription', error});
      }
    }
  };

  return (
    <ScrollView >
    

      <View>
        <View style={styles.container}>
          

          {subscriptions.map((subscription, index) => (
            <View style={styles.card}>
            <View>
                <Text style={{fontSize: 25, color: colors.white, textTransform:'uppercase', fontWeight:'700', marginTop: 30}}>{subscription.name}</Text>
            </View>
            <View style={{marginHorizontal: 50}}>
                <Text style={{color: colors.white, marginTop: 10, fontSize: 15, textAlign:'center'}}>One month free access to selected features.</Text>
            </View>
            <View>
       {     subscription?.subscriptionOfferDetails?.map((offer) => (
                  <TouchableOpacity style={{backgroundColor:colors.white, marginTop: 20, padding: 10, borderRadius: 30}}  onPress={handleBuySubscription(
                    subscription.productId,
                    offer.offerToken,
                  )}>
                   <Text style={{fontSize: 15, fontWeight: '700'}}>{`Subscribe ${offer.pricingPhases.pricingPhaseList
                      .map((ppl) => ppl.billingPeriod)
                      .join(',')}`}</Text>
                  </TouchableOpacity>
                ))}
             
            </View>
        </View>
          ))}
        </View>

        <Button
          title="Get the subscriptions"
          onPress={handleGetSubscriptions}
        />

{/**<ScrollView>
    <View style={{flexDirection:'row'}}>
                <View style={styles.card}>
                    <View>
                        <Text style={{fontSize: 25, color: colors.white, textTransform:'uppercase', fontWeight:'700', marginTop: 30}}>Free</Text>
                    </View>
                    <View style={{marginHorizontal: 50}}>
                        <Text style={{color: colors.white, marginTop: 10, fontSize: 15, textAlign:'center'}}>One month free access to selected features.</Text>
                    </View>
                    <View>
                        <View style={{backgroundColor:colors.white, marginTop: 20, padding: 10, borderRadius: 30}}>
                            <Text style={{fontSize: 15, fontWeight: '700'}}>1 Month Free</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <View>
                        <Text style={{fontSize: 25, color: colors.white, textTransform:'uppercase', fontWeight:'700', marginTop: 30}}>Basic</Text>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{color: colors.white, marginTop: 10, fontSize: 15, textAlign:'center'}}>3 month free access to selected features.Can manage only 1 store.</Text>
                    </View>
                    <View>
                        <View style={{backgroundColor:colors.white, marginTop: 10, padding: 10, borderRadius: 30}}>
                            <Text style={{fontSize: 15, fontWeight: '700'}}>3 Months for ₱500.</Text>
                        </View>
                    </View>
                </View>
    </View>
    <View style={{flexDirection:'row'}}>
                <View style={styles.card}>
                    <View>
                        <Text style={{fontSize: 25, color: colors.white, textTransform:'uppercase', fontWeight:'700', marginTop: 30}}>Intermediate</Text>
                    </View>
                    <View style={{marginHorizontal: 18}}>
                        <Text style={{color: colors.white, marginTop: 10, fontSize: 15, textAlign:'center'}}>5 month access to all features.Maximum of 3 stores to manage + Access to warehouse features.</Text>
                    </View>
                    <View>
                        <View style={{backgroundColor:colors.white, marginTop: 10, padding: 10, borderRadius: 30}}>
                            <Text style={{fontSize: 15, fontWeight: '700'}}>5 Months for ₱800</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <View>
                        <Text style={{fontSize: 25, color: colors.white, textTransform:'uppercase', fontWeight:'700', marginTop: 30}}>Advanced</Text>
                    </View>
                    <View style={{marginHorizontal: 18}}>
                        <Text style={{color: colors.white, marginTop: 10, fontSize: 15, textAlign:'center'}}>1 year  access to all features.Maximum of 10 stores to manage + Access to warehouse features.</Text>
                    </View>
                    <View>
                        <View style={{backgroundColor:colors.white, marginTop: 10, padding: 10, borderRadius: 30}}>
                            <Text style={{fontSize: 15, fontWeight: '700'}}>1 Year for ₱2000</Text>
                        </View>
                    </View>
                </View>
      </View>
          </ScrollView>*/}
      </View>
    </ScrollView>
  );
};


        { /**    <View
              key={subscription.productId}
              fields={[
                {
                  label: 'Subscription Id',
                  value: subscription.productId,
                },
              ]}
              isLast={subscriptions.length - 1 === index}
            >
              {Platform.OS === 'android' &&
                // On Google Play Billing V5 you might have  multiple offers for a single sku
                subscription?.subscriptionOfferDetails?.map((offer) => (
                  <Button
                    title={`Subscribe ${offer.pricingPhases.pricingPhaseList
                      .map((ppl) => ppl.billingPeriod)
                      .join(',')}`}
                    onPress={() => {
                      handleBuySubscription(
                        subscription.productId,
                        offer.offerToken,
                      );
                    }}
                  />
                ))}
              {Platform.OS === 'ios' && (
                <Button
                  title="Subscribe"
                  onPress={() => {
                    handleBuySubscription(subscription.productId);
                  }}
                />
              )}
            </View>*/}
export default Subscription;
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  xlgridStyle: {
    flexDirection:'column',
    backgroundColor: colors.coverDark, 
    height:windowHeight/ 3.5, 
    borderBottomLeftRadius: 35, 
    borderBottomRightRadius: 35, 
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  },
  card: {

      alignItems:'center',
      width:windowWidth/ 2.2, 
    height: 250, 
    backgroundColor: colors.secondary, 
    margin: 10, 
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
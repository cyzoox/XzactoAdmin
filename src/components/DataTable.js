import React from "react";
import {  StyleSheet, ScrollView, FlatList, View } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { Text } from 'react-native-elements';
import colors from "../themes/colors";
import Spacer from "./Spacer";
import formatMoney from 'accounting-js/lib/formatMoney.js'

const DataTable = ({ alignment, headerTitles, children, total, ototal }) => {
  return (
    <View style={{flex :1}}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Spacer>
                <Grid>
                    <Row style={{ height: 40,  backgroundColor: colors.coverDark, marginHorizontal: 5}}>
                        {
                            headerTitles.map((rowData) => (      
                                <Col key={rowData} style={[styles.ColStyle,{alignItems: alignment}]}>
                                    <Text  style={styles.textColor}>{rowData}</Text>
                                </Col>      
                            ))
                        }
                    </Row>
                    {children}
                </Grid>    
      </Spacer>
    </ScrollView>
    <View style={styles.footerContainer}>
        <View>
            <Text style={styles.footerBar}>Total</Text>
        </View>
      
        <View>
            <Text style={styles.footerBar}>{formatMoney(total, { symbol: "₱", precision: 2 })}</Text>
        </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textColor: {
    fontSize: 14,
    color: colors.white,
    fontWeight:'bold',
    textAlign:'center'
  },
  ColStyle: {
      width: 120,
      justifyContent: 'center',
      paddingBottom: 5,
  },
  footerBar: {
      color: colors.white,
      fontWeight: 'bold'
  },
  footerContainer: {
      flexDirection:'row', 
      justifyContent:'space-between', 
      margin: 10, 
      backgroundColor:colors.coverDark, 
      padding: 5,
      paddingHorizontal: 5,
    }
});

export default DataTable;

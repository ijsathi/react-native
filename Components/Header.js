import { View, Text} from 'react-native'
import React from 'react'
// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome'


export default function Header() {
    return (
        <View >
        <View style={{ width: "100%", height: "60px", backgroundColor: "#4281c8", display: "flex", flexDirection: "row", justifyContent: "space-between" ,alignItems:"center" , padding:"10px" }}  key="root">
            <Text style={{ color: "#dfeaf2" }}><Icon size={17} name="arrow-left" /> </Text>
            <Text style={{ color: "#dfeaf2" }}>CNN</Text>
            <Text style={{ color: "#dfeaf2" }}><Icon size={17} name="search" />  <Icon size={17} name="dashboard" />  </Text>
        </View>
        </View>
    )
}













{/* <View style={styles.head}>
                <ScrollView style={styles.all}>
                <Icon style={styles.icon} size={17} name="arrow-left" > <Text style={styles.iconText}> CNN </Text></Icon>
                <Icon style={styles.icon2} size={17} name="search" />
                </ScrollView>
            </View> */}
{/* <View style={styles.head}>
                <Icon style={styles.icon} size={17} name="arrow-left" />
                <Text style={styles.iconText}> CNN </Text>
                <Icon style={styles.icon2} size={17} name="search" />                
            </View> */}
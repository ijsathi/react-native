import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Footer() {
    return (
        <View style={{ position: "relative" }}>
            <View style={{ width: "100%", height: "60px", backgroundColor: "#4281c8", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "10px", position: "fixed", bottom: "0px", left: "0" }}>
                    <Text style={{ color: "#dfeaf2" }}><Icon size={17} name="home" /> </Text>
                <Text style={{ color: "#dfeaf2" }}><Icon size={17} name="globe" /> </Text>
                <Text style={{ color: "#dfeaf2" }}><Icon size={17} name="search" />    </Text>
                <Text style={{ color: "#dfeaf2" }}><Icon size={17} name="cog" />    </Text>
            </View>
        </View>

    )
}
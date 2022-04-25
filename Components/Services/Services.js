import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, FlatList, StatusBar, SafeAreaView, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text, Card, Button, Divider } from 'react-native-elements';

export default function Services() {
    // let fixDate = new Date(publishedAt)
    const [totalServices, setTotalServices] = useState([]);
    const [moreTags, setMoreTags] = useState(3);
    const [times, setTimes] = useState({});
    useEffect(() => {
        fetch('https://api.newsbundle.com/news/listNews?from=0&size=20&site=BL')
            .then(res => res.json())
            .then(data => setTotalServices(data))
    }, [moreTags]);

    console.log(totalServices);

    // tags
    const handleMoreTags = (code) => {
        const lengthData = totalServices.find(data => data.news_id === code)
        if (lengthData.tags_array.length < 1) {
            alert('noting more')
        }
        else {
            setMoreTags(lengthData.tags_array.length);
        }


        console.log(moreTags);
    }

    // times
    let fixDate = new Date(publishedAt);
    let currDate = new Date();
    const diff = currDate - fixDate;
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor(diff / (60 * 1000));

    let timeFormat;

    if (hours <= 1 && minutes < 60) {
        timeFormat = `${minutes} minutes`;
    } else if (hours >= 24) {
        const days = Math.floor(hours / 24);
        const hr = Math.floor(hours) % 24;
        timeFormat = `${days} days ${hr} hrs `;
    } else {
        timeFormat = `${hours % 24} hrs ${minutes % 60} minutes`;
    }
    return (

        <SafeAreaView style={styles.container}>
            <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                {
                    totalServices.map(item => {
                        return (
                            // <ScrollView style={{ paddingLeft: 5, paddingRight: 5 }}>
                            <View key={item.news_id} style={{
                                margin: 10,
                                borderRadius: 13, shadowRadius: 14, shadowColor: "rgb(160,160,160)"
                            }} >
                                <View style={{}}>
                                    <Card.Image
                                        style={{ height: 200, borderTopLeftRadius: 13, borderTopRightRadius: 13 }}
                                        source={item.urlToImage}
                                    />
                                    <View style={{ padding: 15 }}>
                                        {/* tags */}
                                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                            {
                                                item.tags_array.slice(0, moreTags).map(x => {
                                                    return (
                                                        <Text key={x.id} style={{ color: "#646363", borderRadius: 15, borderWidth: 1, borderColor: "#8e8d8d", padding: 2, fontSize: 12, textAlign: 'center', margin: 3 }}> {x.name} </Text>
                                                    )
                                                })
                                            }
                                            {/* more tags */}
                                            <Button onPress={() => handleMoreTags(item.news_id)} style={{ backgroundColor: "#3e4eb0", color: "#ffffff", borderRadius: 15, borderWidth: 1, borderColor: "#8e8d8d", padding: 4, fontSize: 12, textAlign: 'center', margin: 3 }} title='More Tags'></Button>
                                        </View>
                                        <Card.Divider />
                                        <Text style={{ fontSize: 17, color: "#444444", fontWeight: 700, marginBottom: 9 }}>{item.title}</Text>
                                        {/* <Card.Divider /> */}
                                        {/* <Text style={{ marginBottom: 10, color: "#9f9595", fontFamily: "'Ubuntu', sans-serif", }}>
                                            {item.description.slice(0, 194)}...
                                        </Text> */}
                                        <Button title='Read More' />
                                        <Card.Divider />
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                <Text style={{ color: "#aaaaaa", marginRight: 10, fontSize: 12 }}><Icon size={13} name="calendar" /> {item.publishedAt.slice(0, 10)}</Text>
                                                <Text style={{ color: "#7b88cc", fontSize: 12 }}>{item.source.name}</Text>
                                            </View>
                                            <Text style={{ color: "#aaaaaa" }}><Icon size={20} name="share-alt" /></Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            // </ScrollView>
                        )
                    })
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    }
});
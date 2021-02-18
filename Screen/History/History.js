import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';

import firestore from '@react-native-firebase/firestore';


export default class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {

        firestore()
            .collection('laporan')
            .get()
            .then(querySnapshot => {
                console.log('Total data laporan: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    console.log('Data: ', documentSnapshot.id, documentSnapshot.data());
                });
            });

    }

    render() {
        return (
            <FlatList
                style={styles.root}
                data={this.state.data}
                extraData={this.state}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={(item) => {
                    const Notification = item.item;
                    return (
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => { }}>
                                <Image style={styles.image} source={{ uri: Notification.image }} />
                            </TouchableOpacity>
                            <View style={styles.content}>
                                <View style={styles.contentHeader}>
                                    <Text style={styles.name}>{Notification.name}</Text>
                                    <Text style={styles.time}>
                                        9:58 am
                                   </Text>
                                </View>
                                <Text rkType='primary3 mediumLine'>{Notification.comment}</Text>
                            </View>
                        </View>
                    );
                }} />
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        marginTop: 10,
    },
    container: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 20,
        marginLeft: 20
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
}); 
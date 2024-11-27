import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileHeader() {
    return (
        <View style={styles.headerContainer}>
            <Image source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/small-dogs-yorkipoo-6626b45068df9.jpg?crop=0.466xw:0.872xh;0.279xw,0.0204xh&resize=980:*' }}
                style={styles.profilePic} />
            <Text style={styles.username}>jimmy._96</Text>
            <View style={styles.attributesContainer}>
                <Attribute title="Cards" count={10}/>
                <Attribute title="Following" count={120}/>
                <Attribute title="Followers" count={1000}/>
            </View>
        </View>
    )
}

interface AttributeProps {
    title: string,
    count: number
}

const Attribute = (props:  AttributeProps) => {
    return (
        <View style={styles.attribute}>
            <Text style={styles.attributeTitle}>{props.title}</Text>
            <Text style={styles.attributeValue}>{props.count}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    profilePic: {
        width: 125,
        aspectRatio: 1,
        borderRadius: 75,
        borderWidth: 2,
    },
    username: {
        fontSize: 22,
        fontWeight: 500,
        padding: 10
    },
    attributesContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginVertical: 20
    },
    attribute: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    attributeTitle: {
        fontSize: 18,
        fontWeight: '400'
    },
    attributeValue: {
        fontSize: 16,
        color: 'grey'
    }
})
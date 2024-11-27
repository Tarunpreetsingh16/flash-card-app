import { StyleSheet, Text, TextInput, View } from "react-native"

interface LabelTextInputProps {
    placeholder: string,
    value: string,
    label: string,
    onChange: (value: string) => void
}

export default function LabelTextInput(props: LabelTextInputProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput allowFontScaling
                style={styles.input}
                value={props.value}
                onChangeText={props.onChange}
                placeholder={props.placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
    },
    container: {
        width: '100%',
        backgroundColor: 'white',
        shadowColor: '#000',
        elevation: 3,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    label: {
        fontWeight: 'bold'
    }
})

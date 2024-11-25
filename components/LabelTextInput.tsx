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
            <TextInput
                style={styles.input}
                value={props.value}
                onChangeText={props.onChange}
                placeholder={props.placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    container: {

    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'grey',
        padding: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    }
})

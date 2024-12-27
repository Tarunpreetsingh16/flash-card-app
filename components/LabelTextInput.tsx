import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, TextInput, View } from "react-native"

interface LabelTextInputProps {
    placeholder: string,
    value: string,
    label?: string,
    onChange: (value: string) => void,
    children?: React.ReactNode,
    returnKeyType?: 'done' | 'next' | 'search' | 'go' | 'send',
    onSubmitEditing?: () => void
}

export default function LabelTextInput(props: LabelTextInputProps) {

    return (
        <View style={styles.container}>
            {props.label && <Text style={styles.label}>{props.label}</Text>}
            <View style={styles.inputFieldContainer}>
                <TextInput allowFontScaling
                    style={{ flex: 1 }}
                    value={props.value}
                    onChangeText={props.onChange}
                    placeholder={props.placeholder} 
                    returnKeyType={props.returnKeyType} 
                    onSubmitEditing={props.onSubmitEditing}/>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        shadowColor: '#000',
        elevation: 3,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        fontWeight: 'bold'
    },
    inputFieldContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
})

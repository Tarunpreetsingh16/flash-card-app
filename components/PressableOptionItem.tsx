import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

type PressableOptionItemProps = {
    label: string;
    onPress: () => void
}

const PressableOptionItem = ({ label, onPress }: PressableOptionItemProps) => {
    return (
        <Pressable style={[styles.optionContainer]} onPress={(onPress)}>
            <Text style={[styles.label]}>{label}</Text>
            <Ionicons name="arrow-forward-circle-outline"
                size={24}
                style={[styles.icon]}
                color="black"/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'grey',
        marginVertical: 5,
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    label: {
        fontSize: 16,
    },
    icon: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: 'black'
    }
})

export default PressableOptionItem;
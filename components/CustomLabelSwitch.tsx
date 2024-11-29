import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-paper';

type CustomLabelSwitchProps = {
    isSwitchOn: boolean;
    onSwitchToggle: (isSwitchOn: boolean) => void
}

const CustomSwitch = ({isSwitchOn, onSwitchToggle}: CustomLabelSwitchProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Private</Text>
            <Switch value={isSwitchOn} onValueChange={onSwitchToggle} style={styles.switch} color='#5F7470'/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        elevation: 3,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    label: {
        fontWeight: 'bold'
    },
    switch: {
    }
})

export default CustomSwitch;

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Modal } from 'react-native-paper';

type CustomModalProps = {
    children: React.ReactNode,
    hideModal: () => void,
    visible: boolean
}

const CustomModal = ({children, hideModal, visible}: CustomModalProps) => {

    return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
            {children}
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',
        alignSelf: 'center',
        paddingVertical: 20,
    }
})

export default CustomModal;
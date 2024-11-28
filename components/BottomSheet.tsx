import React, { forwardRef, RefObject, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View, Text, Alert, Button } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

type BottomSheetComponentProps = {
    children: React.ReactNode;
    bottomSheetRef: RefObject<BottomSheet>,
    snapPoints?: string[],
    closeBottomSheet?: () => void
};
const BottomSheetComponent = (props: BottomSheetComponentProps) => {
    return (
        <BottomSheet
            ref={props.bottomSheetRef}
            index={-1} // Closed initially
            snapPoints={props.snapPoints ?? ['50%', '100%']} // Full-screen height
            enablePanDownToClose={true}
            style={styles.container}
            onClose={props.closeBottomSheet}
        >
            <BottomSheetScrollView style={styles.contentContainer}>
                {props.children}
            </BottomSheetScrollView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey'

    },
    contentContainer: {

    },
});

export default BottomSheetComponent;
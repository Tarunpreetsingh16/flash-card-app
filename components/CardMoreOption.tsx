import { Flashcard } from "@/data/FlashCard";
import BottomSheet from "@gorhom/bottom-sheet";
import { RefObject, useState } from "react";
import BottomSheetComponent from "./BottomSheet";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteFlashcard } from "@/store/reducers/flashcardSlice";
import CustomModal from "./CustomModal";
import UpdateCardModal from "./UpdateCardModal";

type CardMoreOptionsProps = {
    selectedCard: Flashcard | null;
    bottomSheetRef: RefObject<BottomSheet>,
    closeBottomSheet: () => void
};

export default function CardMoreOptions({ selectedCard, bottomSheetRef, closeBottomSheet }: CardMoreOptionsProps) {
    const dispatch = useAppDispatch();
    const [updateCardModalVisible, setUpdateCardModalVisible] = useState(false);

    const openUpdateCardModal = () => {
        closeBottomSheet();
        setUpdateCardModalVisible(true);
    }

    const deleteCard = () => {
        if (selectedCard) {
            dispatch(deleteFlashcard(selectedCard.id));
        }
        closeBottomSheet();
    }

    const closeUpdateCardModal = () => setUpdateCardModalVisible(false)

    const userCardOptions = () => {
        return (
            <>
                <OptionIconLabel label="Edit" onPress={openUpdateCardModal}>
                    <FontAwesome name="pencil" style={[styles.icon]} />
                </OptionIconLabel>

                <OptionIconLabel label="Delete" onPress={deleteCard}>
                    <FontAwesome name="trash" style={[styles.icon]} color={'red'} />
                </OptionIconLabel>
            </>
        )
    }
    const othersCardOptions = () => {
        return (
            <>
                <OptionIconLabel label="Follow account">
                    <FontAwesome name="user-plus" style={[styles.icon]} />
                </OptionIconLabel>
                <OptionIconLabel label="Report">
                    <FontAwesome name="flag" style={[styles.icon]} color={'red'} />
                </OptionIconLabel>
            </>
        )
    }

    return (
        <>
            <BottomSheetComponent bottomSheetRef={bottomSheetRef} snapPoints={['5%']} closeBottomSheet={closeBottomSheet}>
                <View style={[styles.container]}>
                    {
                        selectedCard?.userId === 0 ? userCardOptions() : othersCardOptions()
                    }
                </View>
            </BottomSheetComponent>

            <CustomModal visible={updateCardModalVisible} hideModal={closeUpdateCardModal}>
                {selectedCard &&
                    <UpdateCardModal flashcardToBeUpdated={selectedCard} closeModal={closeUpdateCardModal} />
                }
            </CustomModal>
        </>
    )
}

type OptionIconLabelProps = {
    label: string;
    children: React.ReactNode;
    onPress?: () => void
}

const OptionIconLabel = ({ label, children, onPress }: OptionIconLabelProps) => {
    return (
        <TouchableWithoutFeedback style={[styles.optionContainer]} onPress={onPress}>
            {children}
            <Text style={[styles.label]}>{label}</Text>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: '100%',
    },
    icon: {
        fontSize: 18,
        width: 25 // Space between icon and text
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'grey',
        padding: 10,
        marginVertical: 5
    },
    label: {
        fontSize: 16,
    }
})
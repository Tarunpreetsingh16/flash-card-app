import * as ImagePicker from 'expo-image-picker';
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomImagePickerProps {
    imageUri: string | null,
    setImageUri: (imageUri: string) => void
}

export default function CustomImagePicker(props: CustomImagePickerProps) {

    const selectImage = async () => {
        // Request media library permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }


        // Launch the image picker with 1:1 cropping enabled
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], // Updated here
            allowsEditing: true, // Enables cropping
            aspect: [1, 1],      // 1:1 aspect ratio
            quality: 1,          // High-quality image
        });

        if (!result.canceled) {
            props.setImageUri(result.assets[0].uri);
        }
    }

    return (
        <View style={styles.container}>
            {props.imageUri
                ? <View>
                    <Text style={styles.text} onPress={selectImage}>Change image</Text>
                    <ImageBackground
                        source={{ uri: props.imageUri }}
                        style={styles.image}>
                    </ImageBackground>
                </View>
                : <TouchableOpacity onPress={selectImage} style={styles.imageButton}>
                    <Text>Select image</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    imageButton: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderStyle: 'dashed',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        width: 150,
    },
});

import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomImagePickerProps {
    imageUri: string | null,
    setImageUri: (imageUri: string | null) => void
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
            <View style={styles.labelContainer}>
                <Text style={styles.text} onPress={selectImage}>Image</Text>
                {
                    props.imageUri && <FontAwesome name="window-close" style={styles.icon} onPress={() => props.setImageUri(null)}/>
                }
            </View>
            {props.imageUri
                ? <View>
                    <Image
                        source={{ uri: props.imageUri }}
                        style={styles.image} />
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
        width: '100%',
        marginVertical: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        elevation: 3,
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
        fontWeight: 'bold',
        width: 150,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    labelContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: 'black',
        alignSelf: 'center'
    }
});

import { useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';

type CustomAppBarProps = {
    title: string,
    isOnBackPressVisible?: boolean,
    children?: React.ReactNode
}

const CustomAppBar = ({
    title,
    isOnBackPressVisible,
    children
}: CustomAppBarProps) => {

    const router = useRouter();

    return (
        <Appbar.Header>
            {
                isOnBackPressVisible && <Appbar.BackAction onPress={() => router.back()} />
            }
            <Appbar.Content title={title} />
            {children}
        </Appbar.Header>
    )
}

export default CustomAppBar;
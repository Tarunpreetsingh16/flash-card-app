import { Category } from "@/data/Category";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class CategoryUtility {
    static loadCategories = async (): Promise<Category[] | null> => {
        try {
            const storedCategories = await AsyncStorage.getItem('categories');
            if (storedCategories !== null) {
                return JSON.parse(storedCategories);
            }
        }
        catch (error) {
            console.error('Error loading categories:', error);
        }
        return [];
    }

    static saveCategories = async (categories: Category[]) => {
        await AsyncStorage.setItem('categories', JSON.stringify(categories));
        console.log("Successfully saved categories to async storage!")
    }
}
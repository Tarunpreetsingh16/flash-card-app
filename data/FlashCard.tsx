import { Category } from "./Category";
import { Option } from "./Option";

export interface Flashcard {
    id: number;
    userId: number;
    front: string;
    back: string;
    tags: string[];
    imageUri: string | null;
    isPrivate: boolean;
    options: Option[];
    categoryId: number
    likes?: number;
    dislikes?: number;
    shares?: number;
}

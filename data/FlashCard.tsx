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
    category: number
    likes?: number;
    dislikes?: number;
    shares?: number;
}

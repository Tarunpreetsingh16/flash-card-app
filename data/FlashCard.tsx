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
    favorite?: boolean;
    likes?: number;
    dislikes?: number;
    shares?: number;
}

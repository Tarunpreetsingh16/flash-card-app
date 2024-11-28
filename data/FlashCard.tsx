import { Option } from "./Option";

export class Flashcard {
    id: number;
    userId: number;
    front: string;
    back: string;
    tags: string[];
    imageUri: string | null;
    isPrivate: boolean;
    options: Option[];
    likes?: number = 0;
    dislikes?: number = 0;
    shares?: number = 0;

    constructor(id: number, userId: number, front: string, back: string, tags: string[], imageUri: string | null, isPrivate: boolean, options?: Option[], likes?: number, dislikes?: number, shares?: number) {
        this.id = id;
        this.userId = userId;
        this.front = front;
        this.back = back;
        this.tags = [...tags];
        this.imageUri = imageUri;
        this.isPrivate = isPrivate;
        this.options = options ? [...options] : [];
        this.likes = likes ?? 0;
        this.dislikes = dislikes ?? 0;
        this.shares = shares ?? 0;
    }
}

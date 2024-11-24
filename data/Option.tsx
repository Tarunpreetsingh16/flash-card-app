export class Option {
    text: string;
    correct: boolean;
    selectCount?: number;

    constructor(text:string, correct: boolean) {
        this.text = text;
        this.correct = correct;
        this.selectCount = 0;
    }
}
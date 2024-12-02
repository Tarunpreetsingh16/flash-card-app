import { Flashcard } from "@/data/FlashCard";

export const fetchCardsAPI = async () => {
    // const response = await fetch('https://api.example.com/cards');
    // return await response.json();
    
  };
  
  export const addCardAPI = async (card: Flashcard) => {
    const response = await fetch('https://api.example.com/cards', {
      method: 'POST',
      body: JSON.stringify(card),
    });
    return await response.json();
  };
  
  export const deleteCardAPI = async (id: number) => {
    await fetch(`https://api.example.com/cards/${id}`, { method: 'DELETE' });
  };
  
'use client'

import React, { useState, useEffect } from 'react';
import Card from './Card';
import styles from './Game.module.css';

interface CardType {
    id: number;
    flag: string;
    code: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const Game: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);

    useEffect(() => {
        // Fetch flags and initialize cards
        const fetchFlags = async () => {
            // const response = await fetch('https://flagsapi.com/api/v1/countries');
            // const data = await response.json();
            // const flags = data.slice(0, 8); // Get 8 unique flags for a 4x4 grid

            const flags = [
                {
                    flag: 'https://flagsapi.com/BE/shiny/64.png',
                    code: 'BE'
                },
                {
                    flag: 'https://flagsapi.com/AK/shiny/64.png',
                    code: 'AK'
                },                {
                    flag: 'https://flagsapi.com/BR/shiny/64.png',
                    code: 'BR'
                },                {
                    flag: 'https://flagsapi.com/CA/shiny/64.png',
                    code: 'CA'
                },                {
                    flag: 'https://flagsapi.com/EG/shiny/64.png',
                    code: 'EG'
                },                {
                    flag: 'https://flagsapi.com/GB/shiny/64.png',
                    code: 'GB'
                },                {
                    flag: 'https://flagsapi.com/HU/shiny/64.png',
                    code: 'HU'
                },                {
                    flag: 'https://flagsapi.com/KI/shiny/64.png',
                    code: 'KI'
                }
            ]
            const shuffledCards = shuffle([...flags, ...flags].map((flag, index) => ({
                id: index,
                flag: flag.flag,
                code: flag.code,
                isFlipped: false,
                isMatched: false,
            })));
            setCards(shuffledCards);
        };
        fetchFlags();
    }, []);

    const shuffle = (array: any[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (id: number) => {
        if (flippedCards.length === 2) return;

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [first, second] = newFlippedCards;
            if (cards[first].code === cards[second].code) {
                setMatchedCards([...matchedCards, first, second]);
                setCards(cards.map(card => card.id === first || card.id === second ? { ...card, isMatched: true } : card));
            }
            setTimeout(() => setFlippedCards([]), 1000);
        }
    };

    return (
        <div className={styles.grid}>
            {cards.map(card => (
                <Card
                    key={card.id}
                    card={card}
                    onClick={() => handleCardClick(card.id)}
                    isFlipped={flippedCards.includes(card.id) || card.isMatched}
                />
            ))}
        </div>
    );
};

export default Game;
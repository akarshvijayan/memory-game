import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    card: {
        id: number;
        flag: string;
        code: string;
        isFlipped: boolean;
        isMatched: boolean;
    };
    onClick: () => void;
    isFlipped: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, isFlipped }) => {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ''}`}>
                <div className={styles.cardFront}>
                    <img src={card.flag} alt="Country flag" />
                </div>
                <div className={styles.cardBack}></div>
            </div>
        </div>
    );
};

export default Card;
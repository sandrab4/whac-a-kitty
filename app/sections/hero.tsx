"use client"
import React, { useState, useEffect } from "react";
import "./css/hero.scss";

const Hero = () => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [kittyPosition, setKittyPosition] = useState<number | null>(null);
    const [micePosition, setMicePosition] = useState<number | null>(null);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        let kittyInterval: NodeJS.Timeout | null = null;
        let miceInterval: NodeJS.Timeout | null = null;

        if (gameStarted && !gameOver) {
            kittyInterval = setInterval(() => setKitty(), 1000);
            miceInterval = setInterval(() => setMice(), 2000);
        }

        return () => {
            if (kittyInterval) clearInterval(kittyInterval);
            if (miceInterval) clearInterval(miceInterval);
        };
    }, [gameStarted, gameOver]);

    const getRandomPosition = () => Math.floor(Math.random() * 9);

    const setKitty = () => {
        if (gameOver) return;
        let newPosition: number;
        do {
            newPosition = getRandomPosition();
        } while (newPosition === micePosition);
        setKittyPosition(newPosition);
    };

    const setMice = () => {
        if (gameOver) return;
        let newPosition: number;
        do {
            newPosition = getRandomPosition();
        } while (newPosition === kittyPosition);
        setMicePosition(newPosition);
    };

    const handleTileClick = (position: number) => {
        if (gameOver || !gameStarted) return;
        if (position === kittyPosition) {
            setScore(prevScore => prevScore + 1);
        } else if (position === micePosition) {
            setGameOver(true);
        }
    };

    const toggleGame = () => {
        if (gameStarted) {
            setGameStarted(false);
            setGameOver(false);
            setScore(0);
            setKittyPosition(null);
            setMicePosition(null);
        } else {
            setGameStarted(true);
            setGameOver(false);
            setScore(0);
            setKittyPosition(null);
            setMicePosition(null);
        }
    };

    return (
        <div id="hero">
            <div id="hero-header">
                <h1>WHAC-A-KITTY</h1>
            </div>

            <div id="hero-score">
                <p>Score: {gameOver ? `GAME OVER: ${score}` : score}</p>
                <button 
                    onClick={toggleGame} 
                    className={gameStarted ? 'active' : ''}
                >
                    {gameStarted ? 'Reset Game' : 'Start Game'}
                </button>
            </div>

            <div id="hero-game">
                {[...Array(9)].map((_, i) => (
                    <div key={i} onClick={() => handleTileClick(i)}>
                        {i === kittyPosition && <img src="./kitty.png" alt="Kitty"/>}
                        {i === micePosition && <img src="./mice.png" alt="Mice"/>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
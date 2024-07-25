"use client"
import React, { useState, useEffect } from "react";
import "./css/hero.scss";

const Hero = () => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [kittyPosition, setkittyPosition] = useState<number | null>(null);
    const [micePosition, setmicePosition] = useState<number | null>(null);

    useEffect(() => {
        const kittyInterval = setInterval(() => setkitty(), 1000);
        const miceInterval = setInterval(() => setmice(), 2000);

        return () => {
            clearInterval(kittyInterval);
            clearInterval(miceInterval);
        };
    }, []);

    const getRandomPosition = () => Math.floor(Math.random() * 9);

    const setkitty = () => {
        if (gameOver) return;
        let newPosition: number;
        do {
            newPosition = getRandomPosition();
        } while (newPosition === micePosition);
        setkittyPosition(newPosition);
    };

    const setmice = () => {
        if (gameOver) return;
        let newPosition: number;
        do {
            newPosition = getRandomPosition();
        } while (newPosition === kittyPosition);
        setmicePosition(newPosition);
    };

    const handleTileClick = (position: number) => {
        if (gameOver) return;
        if (position === kittyPosition) {
            setScore(prevScore => prevScore + 10);
        } else if (position === micePosition) {
            setGameOver(true);
        }
    };

    return (
        <div id="hero">
            <div id="hero-header">
                <h1>WHAC-A-KITTY</h1>
            </div>

            <div id="hero-score">
                <p>Score: {gameOver ? `GAME OVER: ${score}` : score}</p>
            </div>

            <div id="hero-game">
                {[...Array(9)].map((_, i) => (
                    <div key={i} onClick={() => handleTileClick(i)}>
                        {i === kittyPosition && <img src="./kitty.png"/>}
                        {i === micePosition && <img src="./mice.png"/>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
import React from "react";
import "./css/hero.scss";

const Hero = () => {
    return (
        <div id="hero">
            <div id="hero-header">
                <h1>WHAC-A-KITTY</h1>
                <link href='https://fonts.googleapis.com/css?family=Bungee Shade' rel='stylesheet'></link>
            </div>
            <div id="hero-game">
                <img src="wood.png" />
            </div>
        </div>
    );
};

export default Hero;
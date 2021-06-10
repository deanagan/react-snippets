import React, {useRef, useState, useEffect} from "react";

const TextEffect = ({focused, notFocused, text}) => {

    const textRef = useRef(null);

    useEffect(() => {
        textRef.current.style.color = notFocused.color;
    }, []);

    return (

        <h1 onMouseOver={() => {
            textRef.current.style.color = focused.color;
        }} onMouseOut={() => {
            textRef.current.style.color = notFocused.color;
        }} ref={textRef} >{text}</h1>


    );
}

export default TextEffect;
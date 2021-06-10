import React, {useState} from "react";
import TextEffect from "../src/texteffect";

const inputElement = () => {

    const [text, setText] = useState("");


    const onChangeFn = (o) => {
        setText(o.target.value);
    };
    return (
        <div>
            <div>
                {/* <texteffect focused= "images/IMG_0133.JPG"
                            notFocused=  "images/IMG_2403.JPG"
                            text = "Hello World!"
                />
                <texteffect focused= "images/IMG_0133.JPG"
                            notFocused=  "images/IMG_2403.JPG"
                            text = "Hello World!"
                /> */}
                <h1 style={{color: "red"}}>Red Text</h1>
                <TextEffect focused = {{color: 'red'}}
                            notFocused= {{color: 'blue'}}
                            text = "Hello World"
                />
            </div>

            <input onChange={onChangeFn} placeholder="Test" />
            <p>Bound Value: {text} </p>


        </div>
    );

}

export default inputElement;
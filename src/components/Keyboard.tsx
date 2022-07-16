import React, { useEffect } from "react";
import Key from "./Key";
// import layout from "../assets/basicLayout.json";
// import layout2 from "../assets/basicLayoutV2.json";
import layout3 from "../assets/basicLayoutV3.json";


interface KeyboardLayout {
    columns: number;
    keys: Array<KeyItem>;
}

interface KeyItem {
    value: string | number;
    keyEvent: string;
    className?: string;
    columnSpan?: number;
    rowSpan?: number;
    hidden?: boolean;
}

type KeyboardProp = {
    formulaChangeHandler: (keyEvent: string, value: string | number) => void;
};

export default function Keyboard({ formulaChangeHandler }: KeyboardProp) {

    const keyboardLayout: KeyboardLayout = layout3;

    useEffect(() => {
        const onKeyBoardPressed = ({ key }: globalThis.KeyboardEvent) => {
            const keyItem = keyboardLayout.keys.find(k => k.keyEvent === key);
            if (keyItem) {
                formulaChangeHandler(keyItem.keyEvent, keyItem.value);
            }
        };

        window.addEventListener('keydown', onKeyBoardPressed, false);
        return () => window.removeEventListener('keydown', onKeyBoardPressed, false);
    }, [formulaChangeHandler, keyboardLayout.keys]);

    return (

        <div className={"keyboard columns-" + keyboardLayout.columns}>
            {keyboardLayout.keys.filter(k => !k.hidden).map(
                (key, index) =>
                    <Key key=
                        {index}
                        {...key}
                        onClick={() => formulaChangeHandler(key.keyEvent, key.value)} />)}
        </div>);
}

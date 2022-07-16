import React from "react";

type DisplayProp = {
    formula: string;
    result: string;
};

export default function Display({ formula, result }: DisplayProp){
    return(<div className="display">
        <div className = "display-formula">{formula}</div>
        <div className = "display-result">{result}</div>
    </div>

    );
}

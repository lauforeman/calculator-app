import React from "react";

type KeyProp = {
    value: string | number;
    onClick: () => void;
    className?: string;
    columnSpan?: number;
    rowSpan?: number;
};

export default function Key({ value, className = '', columnSpan= 1, rowSpan= 1, onClick }: KeyProp){
    return(<button className={`key ${className} column-span-${columnSpan} row-span-${rowSpan}`}
    onClick = {onClick}>
        {value} 
    </button>);
}

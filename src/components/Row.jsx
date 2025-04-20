import { useState } from "react";
import { calculateVariance } from "../helper";

const Row = ({row, handleUpdateItem, originalValues, isChild}) => {

    const [input, setInput] = useState("");
    const variance = calculateVariance(originalValues[row.id], row.value);

    const handleAllocationPercentage = () => {
        const percent = parseFloat(input);
        if (!isNaN(percent)) {            
            const newValue = parseFloat((row.value + (row.value/10)).toFixed(4));
            handleUpdateItem(row.id, newValue);
        }
        setInput("");
    };

    const handleAllocationValue = () => {
        const value = parseFloat(input);
        if (!isNaN(value)) {
            handleUpdateItem(row.id, value);
        }
        setInput("");
    };
    return (
        <>
            <tr>
                <td>{isChild && `--`} {row.label}</td>
                <td>{row.value}</td>
                <td><input type="text" value={input} onChange={(e) => setInput(e.target.value)}/></td>
                <td><button className="btn percent-btn" onClick={handleAllocationPercentage}>Update by %</button></td>
                <td><button className="btn val-btn" onClick={handleAllocationValue}>Update by Value</button></td>
                <td>{variance}%</td>
            </tr>
            {row.children?.map((childRow, index) => (
                <Row 
                key={childRow.id}
                row={childRow} 
                handleUpdateItem={handleUpdateItem}
                originalValues={originalValues}
                isChild={true} />
            ))}
        </>
    );
}
 
export default Row;

import { useState, useEffect} from 'react';
import initialData from '../service/dummyData.json';
import { updateChildren } from '../helper';
import Row from './Row';

const Table = () => {
    const [data, setData] = useState(() => {
        return initialData?.rows?.map(row => {
            row.value = row.children.reduce((acc, child) => acc + child.value, 0);
            return row;
        }) 
    });    
    const [originalValues, setOriginalValues] = useState({});

    useEffect(() => {
        const values = {};
        const getValues = (rows) => {               
            rows.forEach((row) => {
                values[row.id] = row.value;
                if (row.children) getValues(row.children);
            });
        };
        getValues(data);
        setOriginalValues(values);
    }, []);

    const handleUpdateItem = (id, newValue) => {        
        const updateData = (rows) => {
          return rows.map((row) => {
            if (row.id === id) {
              if (row.children) {
                const updatedChildren = updateChildren(row.children, newValue);
                return {
                  ...row,
                  value: newValue,
                  children: updatedChildren
                };
              }
              return { ...row, value: newValue };
            }
            if (row.children) {
              const updatedChildren = updateData(row.children);
              const subtotal = updatedChildren.reduce((acc, row) => acc + row.value, 0);
              return {
                ...row,
                children: updatedChildren,
                value: parseFloat(subtotal.toFixed(4))
              };
            }
            return row;
          });
        };
        setData(updateData);
      };

    const total = data.flatMap(row => {
        if(row.children) {
            return [row, ...row.children];
        }
        return [row];
    }).reduce((acc, row) => acc + row.value, 0);    
    
    return ( 
        <div>
            <table border="1" cellPadding="5" cellSpacing="0">
                <thead className='table-header'>
                    <tr>
                        <th>Label</th>
                        <th>Value</th>
                        <th>Input</th>
                        <th>Allocation %</th>
                        <th>Allocation Val</th>
                        <th>Variance %</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <Row 
                        key={row.id}
                        row={row}
                        handleUpdateItem={handleUpdateItem}
                        originalValues={originalValues}
                        />
                    ))}
                    <tr>
                        <td><strong>Grand Total</strong></td>
                        <td colSpan="5">{total.toFixed(4)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
     );
}
 
export default Table;
import './testing.css';
import { useState } from 'react';

export default function Testing() {
    const [count, setCount] = useState(0);
    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }
    return (
        <div className='testing'>
            <button onClick={decrement}>-</button>        
            <span>{count}</span>    
            <button onClick={increment}>+</button>
        </div>
    )
}   
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filter, setFilter] = useState([]);

    const options = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
    ];

    const handleSubmit = async () => {
        try {
            console.log('Submitting JSON:', jsonInput); // Debug log
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post('https://bajaj-assesement-backend-1.onrender.com/bfhl', parsedInput); // Updated to port 4000
            console.log('API Response:', res.data); // Debug log
            setResponse(res.data);
        } catch (error) {
            console.error('Invalid JSON or API Error:', error); // Error handling
        }
    };

    return (
        <div>
            <h1>Response Filter</h1>
            <textarea
                rows="5"
                cols="50"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Enter JSON here..."
            />
            <button onClick={handleSubmit}>Submit</button>

            {response && (
                <div>
                    <h2>Filter Results</h2>
                    <Select
                        isMulti
                        options={options}
                        onChange={setFilter}
                    />
                    <pre>
                        {JSON.stringify(
                            filter.reduce((acc, cur) => {
                                acc[cur.value] = response[cur.value];
                                return acc;
                            }, {}),
                            null,
                            2
                        )}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default App;

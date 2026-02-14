import { useEffect, useState } from "react";

function App() {
    const [repertoire, setRepertoire] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/repertoire")
            .then(res => res.json())
            .then(data => setRepertoire(data));
    }, []);

    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState(1);
    const [status, setStatus] = useState("learning");

    const createRepertoire = async () => {
        await fetch("http://localhost:8000/repertoire", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                difficulty: Number(difficulty),
                status
            })
        });

        const res = await fetch("http://localhost:8000/repertoire");
        const data = await res.json();
        setRepertoire(data);
    };


    return (
        <div>
            <h1>Music Assistant</h1>

            <h2>Repertoire</h2>
            <ul>
                {repertoire.map(item => (
                    <li key={item.id}>
                        {item.title} – difficulty {item.difficulty} – {item.status}
                    </li>
                ))}
            </ul>

            <h3>Add Repertoire</h3>
            <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
            <input type="number" value={difficulty} onChange={e => setDifficulty(e.target.value)} />
            <select onChange={e => setStatus(e.target.value)}>
                <option value="learning">learning</option>
                <option value="polishing">polishing</option>
                <option value="mastered">mastered</option>
            </select>
            <button onClick={createRepertoire}>Add</button>

        </div>
    );
}

export default App;
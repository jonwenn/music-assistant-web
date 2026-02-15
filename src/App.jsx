import { useEffect, useState } from "react";

function App() {
    // Repertoire
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

        const resRepertoire = await fetch("http://localhost:8000/repertoire");
        const dataRepertoire = await resRepertoire.json();
        setRepertoire(dataRepertoire);
    };

    // Practice Session
    const [practicesession, setPracticeSession] = useState([]);
    const [practiceSessionRepertoire, setPracticeSessionRepertoire] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/repertoire")
            .then(res => res.json())
            .then(data => setPracticeSessionRepertoire(data));
    }, []);

    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(today);
    const [minutes, setMinutes] = useState("");
    const [reflection, setReflection] = useState("")


    const createPracticeSession = async () => {

        await fetch("http://localhost:8000/practice_session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date,
                minutes: Number(minutes),
                repertoire_id: parseInt(selectedId),
                reflection
            })
        });

        const resPracticeSession = await fetch("http://localhost:8000/practice_session");
        const dataPracticeSession = await resPracticeSession.json();
        setPracticeSession(dataPracticeSession);
    };

    //Weekly plamn
    const [weeklyPlan, setWeeklyPlan] = useState([]);

    const [availableMinutes, setAvailableMinutes] = useState("");


    const createWeeklyPlan = async () => {

        await fetch("http://localhost:8000/weekly_plan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                available_minutes: Number(availableMinutes)
            })
        });

        const resWeeklyPlan = await fetch("http://localhost:8000/weekly_plan");
        const dataWeeklyPlan = await resWeeklyPlan.json();
        setWeeklyPlan(dataWeeklyPlan);
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

            <h2>Practice Session</h2>
            <h3>Add Practice Session</h3>
            <input placeholder="Date" onChange={e => setDate(e.target.value)} />
            <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} />
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                <option value="">Select</option>
                {practiceSessionRepertoire.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.title}
                    </option>
                ))}
            </select>
            <input placeholder="Reflection" onChange={e => setReflection(e.target.value)} />
            <button onClick={createPracticeSession}>Add</button>

            <h2>Weekly Plan</h2>
            <h3>Create Weekly Plan</h3>
            <input placeholder="Available minutes" value={availableMinutes} onChange={e => setAvailableMinutes(e.target.value)}/>
            <button onClick={createWeeklyPlan}>Create</button>
        </div>
    );
}

export default App;
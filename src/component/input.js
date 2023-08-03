import { useState } from "react";

const Input = ({task, setTask, setOpen}) => {
    const [error, setError] = useState(false)

    const add = (e) => {
        e.preventDefault();
        if(e.target.title.value && e.target.detail.value && (e.target.hour.value || e.target.minute.value)) {
            setTask([...task, 
                {
                    title: e.target.title.value, 
                    detail: e.target.detail.value, 
                    duration: (e.target.hour.value*36000) + (e.target.minute.value*600)
                }
            ]);
            setOpen('');
        } else {
            setError(true);
        }
    }

    return (
        <div className="modal" onClick={() => setOpen('')}>
            <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => add(e)}>
                <h2>
                    <span className="material-icons icon" onClick={() => setOpen('')}>close</span>
                    {error && 'Please input title, details and one between hours and minutes!'}
                </h2>
                <input type="text" name="title" placeholder="Title" maxLength="50" autoFocus />
                <input type="text" name="detail" placeholder="Detail" />
                <div className="number">
                    <input type="number" name="hour" placeholder="Hour" min="1" max="24" />
                    <input type="number" name="minute" placeholder="Minute" min="1" max="59" />
                </div>
                <button className="active" type="submit">Add</button>
            </form>
        </div>
    );
}

export default Input;
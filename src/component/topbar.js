const Topbar = ({task, setTask, start, setStart, setOpen, setNum, removeCookie}) => {
    const remainingTime = task.reduce((accumulator, value)=> {
        return accumulator + value.duration;
    }, 0);
    const hour = Math.floor((remainingTime / 36000) % 60);
    const minute = Math.ceil((remainingTime / 600) % 60);

    const HandleDelete = () => {
        setTask([]);
        setStart(false);
        setNum(0);
        removeCookie('task', { path: '/' });
    }

    return (
        <div className="topbar">
            <h1>
                <span className="material-icons icon">timer</span>
                <span className="text">Remaining time:</span>
                <span className="time">
                    {!task.length ? '-' : hour <= 0 && remainingTime <= 0 ? 'over' : 
                    `${hour > 0 ? hour+'h' : ''} ${minute > 0 ? minute+'m' : ''}`}
                </span>
            </h1>
            <div className="btn">
                <button className="active" onClick={() => setOpen('input')}>
                    <span className="material-icons icon">add</span>
                    <span className="text">Create</span>
                </button>
                <button className={task.length && 'active'} onClick={() => HandleDelete()}>
                    <span className="material-icons icon">delete</span>
                    <span className="text">Delete</span>
                </button>
                {start ? 
                    <button onClick={() => setStart(false)}>
                        <span className="material-icons icon">pause</span>
                        <span className="text">Pause</span>
                    </button>
                : 
                    <button className={task.length && 'active'} onClick={() => task.length && setStart(true)}>
                        <span className="material-icons icon">play_arrow</span>
                        <span className="text">Start</span>
                    </button>
                }
            </div>
        </div>
    );
}

export default Topbar;
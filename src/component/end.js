const End = ({setOpen}) => {
    return (
        <div className="modal" onClick={() => setOpen('')}>
            <div className='end' onClick={(e) => e.stopPropagation()}>
                <span className="material-icons icon">done_all</span>
                <h1>Your action is finished!</h1>
                <h2 className='active' onClick={() => setOpen('')}>OK</h2>
            </div>
        </div>
    );
}

export default End;
const List = ({task, start, num}) => {
    return (
        <div className='list'>
            {task.length ? task.map((t, i) => 
                <div className={start && i === num ? 'box active' : 'box'} key={i}>
                    <div className="title">
                        <h1>{t.title}</h1>
                        {t.duration > 0 ? 
                            <h2>
                                {`
                                    ${Math.floor((t.duration / 36000) % 60) > 0 ? Math.floor((t.duration / 36000) % 60)+'h' : ''} 
                                    ${Math.ceil((t.duration / 600) % 60) > 0 ? Math.ceil((t.duration / 600) % 60)+'m' : ''}
                                `}
                            </h2>
                        :
                            <span className="material-icons icon">done</span>
                        }
                    </div>
                    <h2 className="detail">{t.detail}</h2>
                </div>
            ) :
            <h2 className="empty">Empty list... Create your action!</h2>
            }
        </div>
    );
}

export default List;
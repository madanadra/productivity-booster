import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import Topbar from './component/topbar';
import List from './component/list';
import Input from './component/input';
import End from './component/end';

function App() {
  const [task, setTask] = useState([])
  const [start, setStart] = useState(false)
  const [open, setOpen] = useState('')
  const [num, setNum] = useState(0)
  const date = new Date().getTime()
  const [cookies, setCookie, removeCookie] = useCookies(['task']);

  useEffect(() => {
    if(cookies.task) {
      setTask(cookies.task);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const starting = setTimeout(() => {
      if (start) {
        const dif = (new Date().getTime() - date)/100;
        const second = Math.floor(dif);
        if (task[num].duration > 0) {
          const newResult = [...task]
          newResult[num] = {...task[num], duration: task[num].duration - second}
          setTask(newResult);
          setCookie('task', JSON.stringify(newResult), { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        } else {
          if (num+1 < task.length) {
            const over = Math.abs(task[num].duration)
            const newResult = [...task]
            newResult[num+1] = {...task[num+1], duration: task[num+1].duration - second - over}
            setNum(num+1);
            setTask(newResult);
            setCookie('task', JSON.stringify(newResult), { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
          } else {
            clearTimeout(starting);
            setStart(false);
            setOpen('end');
          }
        }
      } else {
        clearTimeout(starting);
      }
    }, 100);

    return () => { 
      clearTimeout(starting);
    };
  }, [task, start]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      <Topbar task={task} setTask={setTask} start={start} setStart={setStart} setOpen={setOpen} setNum={setNum} removeCookie={removeCookie} />
      <List task={task} start={start} num={num} />
      {
        open === 'input' ? <Input task={task} setTask={setTask} setOpen={setOpen} /> : 
        open === 'end' ? <End setOpen={setOpen} /> : []
      }
    </div>
  );
}

export default App;

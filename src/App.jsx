import { useState } from 'react'
import './App.css'


function App() {
  const [task, setTask] = useState({ id: 0, desc: "",isDone:false })
  const [num, setNum] = useState(0)
  const [tasks, setTasks] = useState([])
  const [editmode,setEditmode]=useState(false)

  const changeTask = (e) => {
    setTask({ id: num, desc: e.target.value, isDone: false })
  }

  const addTask = () => {
    setTasks([...tasks, task])
    setNum(i=>{
      let newid=i+1;
      
      setTask({ id: newid, desc: "", isDone: false })
      return newid
    })
    setEditmode(false)
  }

  const deleteTask = (e) => {
    let id=e.target.name
    let newTasks=(tasks.filter(task => task.id !== parseInt(id)))
    setTasks(newTasks)
  }

  const editTask = (e) => {
    console.log(editmode)
    if(editmode===false){
      let id=parseInt(e.target.name)
      // console.log(e.target.name)
      let ta=tasks.find(t=>t.id===id)
      setNum(n=>{
        let newid=n+1;
        ta.id=newid
        return newid
      })
      if(ta===undefined){console.log("shit",e.target)}
      setTask(ta)
      let newTasks=(tasks.filter(task => task.id !== id))
      setTasks(newTasks)
      setEditmode(true)
    }
    else{
      alert("already one task is being edited !")
    }
  }

  const toggle = (e) => {
    let id = e.target.name
    let index = tasks.findIndex((task) => task.id === parseInt(id))
    let newTasks = [...tasks]
    newTasks[index].isDone = !newTasks[index].isDone
    newTasks.sort((a, b) => a.isDone - b.isDone)
    setTasks(newTasks)
  }

  return (
    <>
      <nav className='bg-yellow-300 flex justify-between h-[10vh] items-center'>
        <div className='mx-3'>MyTask</div>
        <ul className='flex gap-3 mx-6'>
          <li>Home</li>
          <li>About Us</li>
        </ul>
      </nav>

      <div className='h-[15vh] flex justify-center items-center'>
        <input placeholder='add a new task' name='task' type="text" onChange={changeTask} value={task.desc} className='bg-green-300 w-1/2 mx-3 h-[8vh] rounded-lg' />
        <button onClick={addTask} className='bg-purple-500 h-10 w-20 rounded-md mx-3 font-bold text-white'>Add</button>
      </div>
      <div className='h-[75vh] bg-green-200 flex flex-col items-center overflow-y-auto'>
        <h2 className='text-black font-bold text-2xl my-2'>Tasks</h2>
        <div className='flex flex-col justify-between items-center'>
          {!tasks.length && <p className='text-black text-2xl ml-2 mr-6'>No tasks yet</p>}
          {tasks.map(arg => {
            return <div key={arg.id} className='flex mb-3 justify'>
              <input name={arg.id} onChange={toggle} type="checkbox" />
              <div className={arg.isDone ? 'text-gray-500 text-2xl ml-2 mr-6 line-through  ' : 'text-black text-2xl ml-2 mr-6'}>{arg.desc}</div>
              <div className='mx-6 flex'>
                <button name={arg.id} onClick={editTask} className='bg-purple-500 h-10 w-8 rounded-md mx-3 font-bold fill-white flex justify-center items-center'>Edit</button>
                <button  name={arg.id} onClick={deleteTask} className='bg-purple-500 h-10 w-20 rounded-md mx-3 text-white font-bold'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

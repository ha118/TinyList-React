import {useState,useEffect} from 'react'
import Task from './task'
import AddButton from './AddButton'
// import { Wallpaper } from '@material-ui/icons'

// function to cause delay
function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const TaskList=()=>{
    const[tasks,setTasks]=useState([])

const deleteTask=async(id)=>{
    // Uncomment below lines to use an API.
    // await fetch(`API GOES HERE`,{
    //     method:'DELETE',
    // })

    // Comment below line when using API (Used to cause delay for animation) 
    await timeout(600);
    setTasks(tasks.filter((n)=>n.id!==id))
}

const onAdd=async (description)=>{
    // Uncomment below lines to use an API.
    // const res=await fetch('API GOES HERE',{
    //     method: 'POST',
    //     headers: {
    //         'Content-type':'application/json'
    //     },
    //     body: JSON.stringify(description)
    // })
    // const data=await res.json()

    // Comment below lines when using API
    const data=
    {
            "id":Math.floor(Math.random()*10000)+1,
            "title": null,
            "user_id":1,
            "description": description.description,
            "completed_at": null,
            "created_at": (new Date()).toJSON(),
            "updated_at": (new Date()).toJSON()
    }
    setTasks([data,...tasks])
}

const onUpdate=async(id,description)=>{
    // Uncomment below lines to use an API.
    // await fetch(`API GOES HERE`,{
    //     method:'PUT',
    //     headers: {
    //         'Content-type':'application/json'
    //     },
    //     body: JSON.stringify(description)
    // })
}

const onComplete=async(id)=>{
    // Uncomment below lines to use an API.
    // const res=await fetch(`API GOES HERE`,{
    //     method:'PUT',
    // })
    const temp=tasks.filter((n)=>n.id!==id)
    const datatmp=tasks.filter((n)=>n.id===id)
    
    // Uncomment below lines when using API.
    // const data=await res.json()

    // Comment below lines when using API.
    const data=
    {
            "id":Math.floor(Math.random()*10000)+1, //Due to error thrown by MaterialUI library, assigning new ID.
            "title": datatmp[0].title,
            "user_id":datatmp[0].user_id,
            "description": datatmp[0].description,
            "completed_at": (new Date()).toJSON(),
            "created_at": datatmp[0].created_at,
            "updated_at": datatmp[0].updated_at
    }

    // delay used for animation
    await timeout(600);
    setTasks([...temp,data])
}

const onUnComplete=async(id)=>{
    // Uncomment below lines to use an API.
    // const res=await fetch(`API GOES HERE`,{
    //     method:'PUT',
    // })
    const temp=tasks.filter((n)=>n.id!==id)
    const datatmp=tasks.filter((n)=>n.id===id)

    // Uncomment below lines when using API.
    // const data=await res.json()

    // Comment below lines when using API.
    const data=
    {
        "id":Math.floor(Math.random()*10000)+1, //Due to error thrown by MaterialUI library, assigning new ID.
        "title": datatmp[0].title,
        "user_id":datatmp[0].user_id,
        "description": datatmp[0].description,
        "completed_at": null,
        "created_at": datatmp[0].created_at,
        "updated_at": datatmp[0].updated_at
    }

    const tempLess=temp.filter((n)=>new Date(n.created_at).getTime()<=new Date(data.created_at).getTime() && n.completed_at==null)
    const tempMore=temp.filter((n)=>new Date(n.created_at).getTime()>new Date(data.created_at).getTime() && n.completed_at==null)
    const tempComplete=temp.filter((n)=>n.completed_at!=null)

    // delay used for animation
    await timeout(600);
    setTasks([...tempMore,data,...tempLess,...tempComplete])
}

useEffect(() => {
    const getTasks=async()=>{
        const tasksfromServer=await fetchTasks()
        setTasks(tasksfromServer.sort((a, b)=>{
            if(a.completed_at==null && b.completed_at==null)
            {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            }
            if(a.completed_at!=null && b.completed_at==null)
            {
                return 1
            }
            if(a.completed_at==null && b.completed_at!=null)
            {
                return -1
            }
            if(a.completed_at!=null && b.completed_at!=null)
            {
                return new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime()
            }

            return 0
            
        }))
    }

    getTasks()
},[])

const fetchTasks = async()=>{
    // Uncomment below lines to use an API.
    // const res=await fetch('API GOES HERE')
    // const data=await res.json()

    // Comment below lines when using API.
    const data=[
        {
            "id":34,
            "title": null,
            "user_id":1,
            "description": "Sample Task 1",
            "completed_at": null,
            "created_at": "2021-04-11T09:38:20.401Z",
            "updated_at": "2021-05-03T09:48:52.119Z",
        },
        {
            "id":21,
            "title": null,
            "user_id":1,
            "description": "Sample Task 2",
            "completed_at": "2021-05-03T12:11:50.428Z",
            "created_at": "2021-04-11T12:22:51.463Z",
            "updated_at": "2021-05-03T12:11:50.428Z",
        }
    ]

    return data
}

return (
    <div>
        <AddButton onAdd={onAdd}/>
        {tasks.map((n)=>(
            <Task key={n.id} task={n} onDelete={deleteTask} onUpdate={onUpdate} onComplete={onComplete} onUnComplete={onUnComplete}/>
        ))}
    </div>
)
}

export default TaskList

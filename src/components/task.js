import './task.css';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FcCheckmark } from "react-icons/fc";
import {useState} from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Slide from '@material-ui/core/Slide';
import Input from '@material-ui/core/Input';

const Task = ({task,onDelete,onUpdate,onComplete,onUnComplete}) => {

const [hlit, setHlit] = useState(false)
const [desc,setDesc]=useState(false)
const [dispText,setDispText]=useState(task.description)
const [completed,setCompleted]=useState(task.completed_at!=null?true:false)
const [showTask,setShowTask]=useState(true)

        const showBin=()=>{
            setHlit(true);
            }
    
        const hideBin=()=>{
            setHlit(false)
            }   

            const showInput=()=>{
                setDesc(true)
            }

            const hideInput=()=>{
                setDesc(false)
                let description=dispText
                onUpdate(task.id,{description})
            }

            const onTick=()=>{
                setShowTask(false)
                setCompleted(!completed)
                if(completed)
                {
                    onUnComplete(task.id)
                }
                else
                {
                    onComplete(task.id)
                }
            }

            const onDel=(id)=>{
                setShowTask(false)
                onDelete(id)
            }
    
    
    return (
        <Slide direction="right" in={showTask}>
        <div className={`${hlit?'taskhlit':'task'}`} onMouseEnter={() => showBin()} onMouseLeave={() => hideBin()}>
        
            {/* <h3> */}
                <Checkbox style={desc?{display:'none'}:{}} defaultChecked={task.completed_at!=null?true:false} onClick={()=>onTick()}/>
                <FcCheckmark style={desc?{}:{display:'none'}} onClick={()=>hideInput()}/>
                <Input className="text-def" value={dispText} onChange={(e)=>setDispText(e.target.value)} style={desc?{}:{display:'none'}}/>
                <span className={`${completed?'strikeshow':'text-def'}`} onClick={()=>showInput()}>{`${desc?'':dispText}`}</span>
                <RiDeleteBin5Fill className={`${hlit?'delshow':'delhid'}`} onClick={()=>onDel(task.id)}/>
                
            {/* </h3> */}
            
        </div></Slide>
    )
}

export default Task
import {useState} from 'react'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';

const AddButton = ({onAdd}) => {
    const [description, setDescription] = useState('')
    const onSub=()=>{
        if(description)
        {
            setDescription('')
            onAdd({description})
        }
    }
    return (
        <div className="content">
            <IconButton color="secondary" onClick={()=>onSub()}><AddIcon /></IconButton>
            <Input className="inp" color="secondary" placeholder="Add to list" value={description} onChange={(e)=>setDescription(e.target.value)}/>

        </div>
    )
}




export default AddButton

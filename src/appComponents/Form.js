import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

const Form = ({classes}) => {
    const [newFind, setNewFind] = useState(''); 
    const [newExchange, setNewExchange] = useState(''); 
    const [newDesc, setDesc] = useState('')

    const handleSubmit = () => {
        console.log(newFind, " ", newExchange, " ", newDesc); 
    }
    const handleDesc = (event) => {
        setDesc(event.target.value)
    }

    return(
        <div>
            <h1>Submit a new request</h1>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={classes}
                onChange={(event, value) => setNewFind(value)}
                renderInput={(params) => <TextField {...params} label="Class you're looking for: " />}
            />
            <br />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={classes}
                onChange={(event, value) => setNewExchange(value)}
                renderInput={(params) => <TextField {...params} label="Class you're exchanging (Optional): " />}
            />
            < br/>
            <TextField
                id="outlined-textarea"
                label="Description and Additional Info"
                placeholder="Placeholder"
                rows={4}
                multiline
                value={newDesc}
                onChange={handleDesc}
            />
            <br /><br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Form
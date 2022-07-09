import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Search = ({classes, setFind, setExchange}) => {
  return (
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={classes}
          onChange={(event, value) => setFind(value)}
          renderInput={(params) => <TextField {...params} label="Class you're looking for: " />}
        />
        <br />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={classes}
          onChange={(event, value) => setExchange(value)}
          renderInput={(params) => <TextField {...params} label="Class you're exchanging: (Optional) "/>}
        />
      </div>
  )
}

export default Search;
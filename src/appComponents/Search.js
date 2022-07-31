import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './styles/search.css'

const Search = ({classes, setFind, setExchange}) => {
  return (
    <div className="all">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        className="Autocomplete"
        options={classes}
        onChange={(event, value) => setExchange(value)}
        InputLabelProps={{ shrink: false }}
        renderInput={(params) => <TextField {...params} label="Looking for:" />}
        style={{
          backgroundColor: "white",
          "font-family": "'Lato', sans-serif",
        }}
      />
      <br />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={classes}
        onChange={(event, value) => setFind(value)}
        renderInput={(params) => <TextField {...params} label="Exchanging:" />}
        style={{
          backgroundColor: "white",
          border: 0, 
        }}
      />
      <br />
    </div>
  );
}

export default Search;
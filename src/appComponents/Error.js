import * as React from 'react';
import Alert from '@mui/material/Alert';
import { useSelector } from "react-redux";

const Error = () => {
    const notice = useSelector((state) => state.notice)
    if (notice[0] == "" || notice[0] == null) {
        return; 
    }
    return (
      <div style={{ position: "fixed", zIndex: 99999999999, top: .5 }}>
        {notice[0] !== "" && <Alert severity={notice[1]}>{notice[0]}</Alert>}
      </div>
    );
}

export default Error 
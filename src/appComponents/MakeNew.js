import {useNavigate} from 'react-router-dom';
import Popup from './Form'

const MakeNew = ({classes}) => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Can't find what you're looking for?</h3>
      <Popup classes={classes} />
    </div>
  )
}

export default MakeNew
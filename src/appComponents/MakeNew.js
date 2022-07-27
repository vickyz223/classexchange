import Popup from './Form'
import './styles/makenew.css'
import SignIn from './SignIn'
import { useDispatch, useSelector } from "react-redux";

const MakeNew = ({classes}) => {
  const user = useSelector(state => state.user)

  if (user !== null) {
    return (
      <div className='allMN'>
        <h3>Can't find what you're looking for?</h3>
        <Popup classes={classes} user={user} />
      </div>
    )
  } else {
    return (
      <div className="allMN">
        <h3>Can't find what you're looking for?</h3>
        <SignIn />
        <h4>and make a new post!</h4>
      </div>
    )
  }
  
}

export default MakeNew
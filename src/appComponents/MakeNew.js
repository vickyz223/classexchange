import Popup from './Form'
import './styles/makenew.css'
import SignIn from './SignIn'

const MakeNew = ({classes, user, setUser}) => {
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
        <SignIn setUser={setUser} />
        <h4>and make a new post!</h4>
      </div>
    )
  }
  
}

export default MakeNew
import Popup from './Form'
import './styles/makenew.css'

const MakeNew = ({classes}) => {
  return (
    <div className='allMN'>
      <h3>Can't find what you're looking for?</h3>
      <Popup classes={classes} />
    </div>
  )
}

export default MakeNew
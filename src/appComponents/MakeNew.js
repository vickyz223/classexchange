import {useNavigate} from 'react-router-dom';

const MakeNew = () => {
  const navigate = useNavigate();
  const goToCreate = () => {
    navigate('/newpost');
  }

  return (
    <div>
      <h3>Can't find what you're looking for?</h3>
      <button onClick={goToCreate}>Make a new Post!</button>
    </div>
  )
}

export default MakeNew
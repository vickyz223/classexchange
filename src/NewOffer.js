import Form from './appComponents/Form'

const NewOffer = () => {
    const classes = ['MATH 32A', 'MATH 32B', 'MATH 33A', 'COM SCI 1', 'COM SCI 32', 'PHYSICS 1A', 'PHYSICS 1B']; 
    return (
        <div>
            <Form classes={classes} />
        </div>
    )
}

export default NewOffer; 
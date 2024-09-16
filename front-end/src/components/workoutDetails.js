import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const WorkoutDetails = ({workout}) => {
	const {title, reps, load, _id} = workout
	const { workouts, dispatch } = useWorkoutsContext()
	const deleteWorkout = async(e) => {
		const response = await fetch(`/api/workout/${_id}`,{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
	if (response.ok) {
        // Optionally, you could update the state to remove the deleted item from the UI
        dispatch({type: 'DELETE_WORKOUT', payload: workouts.filter((i)=> i._id != _id)})
      }
	}
	return(
		<div className='workoutDetails'>
			<span>{title}</span>
			<span>{reps}</span>
			<span>{load}</span>
			<span><button onClick={deleteWorkout}>delete</button></span>
		</div>
		)
	}
export default WorkoutDetails;
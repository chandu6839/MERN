import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const WorkoutForm = () => {

	const [title, setTittle] = useState('')
	const [reps, setReps] = useState('')
	const [load, setLoad] = useState('')
	const [error, setError] = useState(null)
	const { dispatch } = useWorkoutsContext()

	const handleSubmit = async(e) => {
		e.preventDefault()
		const workout = { title, reps, load }
		const response = await fetch('/api/workout', {
			method: 'POST',
			body: JSON.stringify(workout),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const json = await response.json()
		if(!response.ok) {
			setError(json.error)
		}
		if(response.ok) {
			setError(null)
			setTittle('')
			setReps('')
			setLoad('')
			console.log('new workout added', json)
			dispatch({type: 'CREATE_WORKOUT', payload: json})
		}
	}

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Workout</h3>
			<label>Tittle: </label><input type="text" onChange={(e) => setTittle(e.target.value)} value={title} />
			<label>Reps: </label><input type="number" onChange={(e) => setReps(e.target.value)} value={reps} />
			<label>Load: </label><input type="number" onChange={(e) => setLoad(e.target.value)} value={load} />
			<button>Add Workout</button>
			{error && <div className="err">{error}</div>}
		</form>
		)
}

export default WorkoutForm
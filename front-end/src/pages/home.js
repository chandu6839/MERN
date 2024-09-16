import { useEffect, useState} from 'react'
import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/workoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'


const Home = () => {
	//const [workouts, setworkouts] = useState(null)
	const { workouts, dispatch } = useWorkoutsContext()

	useEffect(()=>{
		const fetchWorkouts = async () => {
			const response = await fetch('/api/workout')
			const json = await response.json()

			if(response.ok) {
				//setworkouts(json)
				dispatch({type: 'SET_WORKOUTS', payload: json})
			}
		}
		fetchWorkouts()
	},[])

	return (
		<>
		<div className="home">
			<h4>home</h4>
			{workouts && workouts.map((workout)=>(
				<WorkoutDetails key={workout._id} workout={workout} />
			))}
		</div>
		<div><WorkoutForm /></div>
		</>
	)
}
export default Home;
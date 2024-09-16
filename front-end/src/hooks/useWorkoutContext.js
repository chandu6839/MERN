import { WorkoutsContext } from '../context/context'
import { useContext } from 'react'

export const useWorkoutsContext = () => {
	const context = useContext(WorkoutsContext)
	if(!context) {
		throw Error('useWorkoutContext must be used')
	}
	return context
}

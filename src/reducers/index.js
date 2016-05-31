import {
	combineReducers
} from 'redux'
import todos from './todos'
import loading from './loading'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
	loading,
	todos,
	visibilityFilter
})

export default todoApp

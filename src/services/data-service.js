import request from 'superagent'

const dataService = store => next => action => {
	next(action)
	switch (action.type) {
	case 'GET_TODO_DATA':
		request
			.get('/data/todo-data.json')
			.end((err, res) => {
				if (err) {
					return next({
						type: 'GET_TODO_DATA_ERROR',
						err
					})
				}
				const data = JSON.parse(res.text)
				next({
					type: 'GET_TODO_DATA_RECEIVED',
					data
				})
			})
		break
	default:
		break
	}

};

export default dataService

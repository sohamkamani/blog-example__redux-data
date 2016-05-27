import request from 'superagent'

const dataService = store => next => action => {

  switch (action.type) {
  case 'GET_TODO_DATA':
    request
      .get('/data/initial-todos.json')
      .end((err, res) => {
        if (err) {
          return store.dispatch({
            type: 'GET_TODO_DATA_ERROR',
            err
          })
        }
        const data = JSON.parse(res.text)
        store.dispatch({
          type: 'GET_TODO_DATA_RECEIVED',
          data
        })
      })
    break
  default:
    console.log(action)
    break
  }

};

export default dataService

import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import todoApp from './reducers'
import App from './components/App'
import dataService from './services/data-service'

let store = createStore(todoApp, applyMiddleware(dataService), window.devToolsExtension
	? window.devToolsExtension()
	: undefined)

render(
	<Provider store={store}>
	<App/>
</Provider>, document.getElementById('root'))

store.dispatch({type: 'GET_TODO_DATA'})

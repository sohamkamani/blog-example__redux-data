import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from './app.jsx';
import Pipeline from './components/pipeline/pipeline.jsx';
import Utilization from './components/utilization/utilization.jsx';
import InNegotiationTable from './components/data-table/in-negotiation.jsx';
import PendingApprovalTable from './components/data-table/pending-approval.jsx';
import ProjectMaterializedTable from './components/data-table/project-materialized.jsx';
import MyStaffing from './components/my-staffing/my-staffing.jsx';

import DataServiceProvider from './utils/data-service';

import dataTableReducer from './reducers/data-table';
import utilizationReducer from './reducers/utilization';
import myStaffingReducer from './reducers/my-staffing';
import pipelineReducer from './reducers/pipeline';
import userInfoReducer from './reducers/user-info';

import canView from './utils/can-view';

const mainReducer = combineReducers({dataTable: dataTableReducer, utilization: utilizationReducer, myStaffing: myStaffingReducer, pipelineTable: pipelineReducer, userInfo: userInfoReducer});

const mainStore = createStore(mainReducer, {}, window.devToolsExtension
	? window.devToolsExtension()
	: undefined);

const node = document.getElementById('app-node');

DataServiceProvider.getUserInfo(userData => {
	const viewRights = canView(userData);
	const render = () => ReactDOM.render((
		<Provider store={mainStore}>
			<Router history={hashHistory}>
				{viewRights.normal
					? (
						<Route path="/" component={App}>
							<Route path="in-negotiation" component={InNegotiationTable}/>
							<Route path="pending-approval" component={PendingApprovalTable}/>
							<Route path="project-materialized" component={ProjectMaterializedTable}/>
							<Route path="my-staffing" component={MyStaffing}/>
							<IndexRoute component={MyStaffing}/>
						</Route>
					)
					: null}
				{viewRights.leadership
					? (
						<Route path="/" component={App}>
							<Route path="pipeline" component={Pipeline}/>
							<Route path="utilization" component={Utilization}/>
							<IndexRoute component={Pipeline}/>
						</Route>
					)
					: null}
			</Router>
		</Provider>
	), node);

	mainStore.subscribe(render);
	mainStore.dispatch({type: 'USER_ACCESS_INFO_RECEIVED', data: userData});
	render();

	const dataService = DataServiceProvider(mainStore.dispatch);

	if (viewRights.normal) {
		dataService.getTableData();
		dataService.getMyStaffingData();
	}
	if (viewRights.leadership) {
		dataService.getPipelineData();
		dataService.getUtilizationData();
	}
});

console.log('env : ', process.env.NODE_ENV);

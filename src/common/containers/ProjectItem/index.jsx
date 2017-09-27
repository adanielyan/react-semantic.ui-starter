import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Loader, Grid} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
//
import ProjectComponent from './components'
import {GET_PROJECT, GET_PROJECT_PENDING} from 'actions/projects'

class ProjectItem extends Component {
	static propTypes = {
		project: PropTypes.object,
		projectId: PropTypes.string,
		projectLoaded: PropTypes.bool,
		projectLoading: PropTypes.bool,
		getProject: PropTypes.func.isRequired,
		location: PropTypes.any
	}

	constructor () {
		super()
		this.isNew = this.isNew.bind(this)
	}

	isNew () {
		let path = this.props.location.pathname

		if (path.search('/project/new') >= 0) {
			return true
		}

		return false
	}

	componentWillMount () {
		if (this.isNew()) {
			return
		}

		const {projectLoaded, projectId} = this.props

		if (!projectLoaded || (projectLoaded && projectId !== this.props.project.uuid)) {
			this.props.getProject(projectId)
		}
	}

	render () {
		let {project, projectLoaded, projectLoading} = this.props

		if (this.isNew()) {
			project = {}
			projectLoaded = true
			projectLoading = false
		}

		return (
			<div>
				<Helmet>
					<title>Project</title>
				</Helmet>
				{projectLoaded
					? <Grid columns={1}>
						<Grid.Row centered>
							<Grid.Column width={16}>
								<ProjectComponent
									{...{project, projectLoaded, projectLoading, isNew: this.isNew()}}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					: <Loader active>Loading...</Loader>}
			</div>
		)
	}
}

function mapStateToProps (state, props) {
	const {id} = props.match.params
	const {project} = state.entities
	const projectLoaded = project.isLoaded
	const projectLoading = project.isLoading
	const item = project.entity

	return {
		project: item,
		projectId: id,
		projectLoading,
		projectLoaded
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getProject: async id => {
			dispatch({type: GET_PROJECT_PENDING})
			const result = await GET_PROJECT(id)
			const project = result
			return dispatch(project)
		}
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ProjectItem)
)

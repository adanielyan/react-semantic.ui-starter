import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Loader, Grid} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
//
import ProjectComponent from './components'
import {GET_PROJECT, GET_PROJECT_PENDING} from 'actions/projects'
import {GET_TEMPLATE, GET_TEMPLATE_PENDING} from 'actions/templates'

class ProjectItem extends Component {
	static propTypes = {
		templateId: PropTypes.string,
		template: PropTypes.object,
		templateLoaded: PropTypes.bool,
		templateLoading: PropTypes.bool,
		getTemplate: PropTypes.func,
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
		const {templateLoaded, templateId, projectLoaded, projectId} = this.props

		if (this.isNew()) {
			if (!templateLoaded || (templateLoaded && templateId !== this.props.template.uuid)) {
				this.props.getTemplate(templateId)
			}
		} else if (!projectLoaded || (projectLoaded && projectId !== this.props.project.uuid)) {
			this.props.getProject(projectId)
		}
	}

	render () {
		let {template, templateLoaded, templateLoading, project, projectLoaded, projectLoading} = this.props

		if (this.isNew()) {
			project = {}
			projectLoaded = true
			projectLoading = false
		} else {
			templateLoaded = projectLoaded
			templateLoading = projectLoading
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
									{...{template, templateLoaded, templateLoading, project, projectLoaded, projectLoading, isNew: this.isNew()}}
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
	let {template, templateItem, templateLoaded, templateLoading, project, projectLoaded, projectLoading, projectItem} = {}
	let {id, templateId} = props.match.params

	if (templateId) {
		template = state.entities.template
		templateLoaded = template.isLoaded
		templateLoading = template.isLoading
		templateItem = template.entity
	} else {
		project = state.entities.project
		template = project.template
		projectLoaded = project.isLoaded
		projectLoading = project.isLoading
		projectItem = project.entity
	}

	return {
		templateId,
		template: templateItem,
		templateLoading,
		templateLoaded,
		project: projectItem,
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
		},

		getTemplate: async id => {
			dispatch({type: GET_TEMPLATE_PENDING})
			const result = await GET_TEMPLATE(id)
			const template = result
			return dispatch(template)
		}
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ProjectItem)
)

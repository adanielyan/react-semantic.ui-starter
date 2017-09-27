import React, {Component} from 'react'
import {Card, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ProjectCardComponent from './ProjectCardComponent'

const itemsPerPage = 5

export default class ProjectComponent extends Component {
	static propTypes = {
		project: PropTypes.object,
		projectLoaded: PropTypes.bool,
		projectLoading: PropTypes.bool,
		template: PropTypes.object,
		templateLoaded: PropTypes.bool,
		templateLoading: PropTypes.bool,
		isNew: PropTypes.bool
	}

	shouldComponentUpdate (nextProps) {
		const template = this.props.template
		const nextTemplate = nextProps.template
		const project = this.props.project
		const nextProject = nextProps.project
		return !_.isEqual(project, nextProject) || !_.isEqual(template, nextTemplate)
	}

	render () {
		const {template, templateLoaded, project, projectLoaded} = this.props

		return (
			<div>
				{ projectLoaded && templateLoaded &&
					<ProjectCardComponent isNew = {this.props.isNew} project = {project} template = {template} />
				}
			</div>
		)
	}
}

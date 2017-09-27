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
		isNew: PropTypes.bool
	}

	shouldComponentUpdate (nextProps) {
		const project = this.props.project
		const nextProject = nextProps.project
		return !_.isEqual(project, nextProject)
	}

	render () {
		// {count, projectsLoading}
		const {project, projectLoaded} = this.props

		return (
			<div>
				{ projectLoaded &&
					<ProjectCardComponent isNew = {this.props.isNew} {...project} />
				}
			</div>
		)
	}
}

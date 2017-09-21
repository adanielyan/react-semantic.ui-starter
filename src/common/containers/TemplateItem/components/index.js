import React, {Component} from 'react'
import {Card, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import TemplateCardComponent from './TemplateCardComponent'

const itemsPerPage = 5

export default class TemplateComponent extends Component {
	static propTypes = {
		template: PropTypes.object,
		templateLoaded: PropTypes.bool,
		templateLoading: PropTypes.bool
	}

	shouldComponentUpdate (nextProps) {
		const template = this.props.template
		const nextTemplate = nextProps.template
		return !_.isEqual(template, nextTemplate)
	}

	render () {
		// {count, templatesLoading}
		const {template, templateLoaded} = this.props

		return (
			<Grid columns={1}>
				<Grid.Row centered>
					<Grid.Column width={16}>
						{ templateLoaded &&
							<TemplateCardComponent {...template} />
						}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

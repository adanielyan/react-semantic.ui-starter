import React, {Component} from 'react'
import {Card, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import DashboardCardComponent from './DashboardCardComponent'
import Pagination from 'components/elements/Pagination'

const itemsPerPage = 5

export default class DashboardComponent extends Component {
	static propTypes = {
		templates: PropTypes.object,
		getTemplates: PropTypes.func,
		templatesLoaded: PropTypes.bool,
		templatesLoading: PropTypes.bool,
		count: PropTypes.number,
		pages: PropTypes.number,
		page: PropTypes.number
	}

	shouldComponentUpdate (nextProps) {
		const {templates} = this.props
		const nextTemplates = nextProps.templates
		return !_.isEqual(templates, nextTemplates)
	}

	handlePageClick (e, {name}) {
		// const skip = (parseInt(name) - 1) * itemsPerPage
		this.props.getTemplates({
			query: {
				page: name
			}
		})
	}

	render () {
		// {count, templatesLoading}
		const {templates, templatesLoaded, count, pages, page} = this.props

		return (
			<Grid columns={1}>
				<Grid.Row centered>
					<Grid.Column width={16}>
						{templatesLoaded &&
							<Card.Group itemsPerRow={3} doubling stackable>
								{_.map(templates, (template, i) =>
									<DashboardCardComponent {...template} key={i} />
								)}
							</Card.Group>}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered>
					<Grid.Column width={16}>
						<Pagination totalPages={pages} handlePageClick={this.handlePageClick.bind(this)} currentPage={page} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

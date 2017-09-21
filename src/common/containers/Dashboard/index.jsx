import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Loader, Grid} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
//
import DashboardComponent from './components'
import Pager from 'components/elements/Pager'
import {GET_TEMPLATES, GET_TEMPLATES_PENDING} from 'actions/templates'

class Dashboard extends Component {
	static propTypes = {
		templates: PropTypes.object,
		templatesLoaded: PropTypes.bool,
		templatesLoading: PropTypes.bool,
		count: PropTypes.number,
		pages: PropTypes.number,
		page: PropTypes.number,
		getTemplates: PropTypes.func.isRequired
	}

	componentWillMount () {
		this.props.getTemplates({
			query: {
				page: this.props.page || 1
			}
		})
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
		const {templates, templatesLoaded, templatesLoading, count, pages, page} = this.props

		return (
			<div>
				<Helmet>
					<title>Dashboard</title>
				</Helmet>
				{templatesLoaded
					? <Grid columns={1}>
						<Grid.Row centered>
							<Grid.Column width={16}>
								<DashboardComponent
									{...{templates, templatesLoaded, templatesLoading, count, pages, page}}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row centered>
							<Grid.Column width={16}>
								<Pager totalPages={pages} pathPrefix="templates" currentPage={parseInt(page) || 1} />
							</Grid.Column>
						</Grid.Row>
					</Grid>
					: <Loader active>Loading...</Loader>}
			</div>
		)
	}
}

function mapStateToProps (state, props) {
	const {templates} = state.entities
	const templatesLoaded = templates.isLoaded
	const templatesLoading = templates.isLoading
	const items = templates.entities
	const {count, pages} = templates
	const {page} = props.match.params || 1

	return {
		templates: items,
		templatesLoading,
		templatesLoaded,
		count,
		pages,
		page
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getTemplates: async (query) => {
			dispatch({type: GET_TEMPLATES_PENDING})
			const result = await GET_TEMPLATES(query)
			return dispatch(result)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

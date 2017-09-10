import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Loader} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
//
import DashboardComponent from './components'
import {GET_TEMPLATES} from 'actions/templates'

class Dashboard extends Component {
	static propTypes = {
		templates: PropTypes.object,
		templatesLoaded: PropTypes.bool,
		templatesLoading: PropTypes.bool,
		count: PropTypes.number,
		getTemplates: PropTypes.func.isRequired
	}

	componentWillMount () {
		this.props.getTemplates()
	}

	render () {
		const {templates, templatesLoaded, templatesLoading, count} = this.props

		return (
			<div>
				<Helmet>
					<title>Dashboard</title>
				</Helmet>
				{templatesLoaded
					? <DashboardComponent
						{...{templates, templatesLoaded, templatesLoading, count}}
					/>
					: <Loader active>Loading...</Loader>}
			</div>
		)
	}
}

function mapStateToProps (state) {
	const {templates} = state.entities
	const templatesLoaded = templates.isLoaded
	const templatesLoading = templates.isLoading
	const items = templates.entities
	const {count} = templates

	return {
		templates: items,
		templatesLoading,
		templatesLoaded,
		count
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getTemplates: async (query) => {
			const result = await GET_TEMPLATES(query)
			return dispatch(result)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

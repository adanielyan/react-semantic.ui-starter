import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Loader, Grid} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
//
import TemplateComponent from './components'
import {GET_TEMPLATE, GET_TEMPLATE_PENDING} from 'actions/templates'

class TemplateItem extends Component {
	static propTypes = {
		template: PropTypes.object,
		templateId: PropTypes.string,
		templateLoaded: PropTypes.bool,
		templateLoading: PropTypes.bool,
		getTemplate: PropTypes.func.isRequired
	}

	componentWillMount () {
		const {templateLoaded, templateId} = this.props
		if (!templateLoaded || (templateLoaded && templateId !== this.props.template.uuid)) {
			this.props.getTemplate(templateId)
		}
	}

	render () {
		const {template, templateLoaded, templateLoading, getTemplate} = this.props

		return (
			<div>
				<Helmet>
					<title>Template</title>
				</Helmet>
				{templateLoaded
					? <Grid columns={1}>
						<Grid.Row centered>
							<Grid.Column width={16}>
								<TemplateComponent
									{...{template, templateLoaded, templateLoading}}
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
	const {template} = state.entities
	const templateLoaded = template.isLoaded
	const templateLoading = template.isLoading
	const item = template.entity

	return {
		template: item,
		templateId: id,
		templateLoading,
		templateLoaded
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getTemplate: async id => {
			dispatch({type: GET_TEMPLATE_PENDING})
			const result = await GET_TEMPLATE(id)
			const template = result
			return dispatch(template)
		}
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(TemplateItem)
)

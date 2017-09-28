import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Button, Icon, Checkbox} from 'semantic-ui-react'
import {VideoPlayer} from 'components'
import {Link} from 'react-router-dom'

export default class ProjectCardComponent extends Component {
	static propTypes = {
		template: PropTypes.object,
		project: PropTypes.object,
		isNew: PropTypes.bool
	}

	render () {
		const { isNew, template, project } = this.props

		let videoId = null

		if (!isNew) {
			videoId = template.demoVideo[0].uri.substr(template.demoVideo[0].uri.search('v=') + 2)
		}

		const imgSrc = template.image && template.image[0] ? template.image[0].uri : require('images/dummy.png')
		return (
			<Card fluid>
				<VideoPlayer
					source="youtube"
					placeholder={imgSrc}
					id={videoId}
					color="white"
					brandedUI={true}
				 />
				<Card.Content>
					<Card.Header>
						{isNew ? template.title : project.title}
					</Card.Header>
					<Card.Meta>
						<span className="date">
							Project template `id` is {template.uuid}
						</span>
					</Card.Meta>
					<Card.Description>
						{template.body.split(' ').slice(0, 50).join(' ')} ...
					</Card.Description>
				</Card.Content>
			</Card>
		)
	}
}

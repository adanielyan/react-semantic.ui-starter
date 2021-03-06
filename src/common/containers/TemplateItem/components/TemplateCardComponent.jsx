import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Button, Icon} from 'semantic-ui-react'
import {VideoPlayer} from 'components'
import {Link} from 'react-router-dom'

export default class TemplateCardComponent extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		body: PropTypes.any,
		demoVideo: PropTypes.array,
		resolutionsAndPrices: PropTypes.arrayOf(PropTypes.object),
		image: PropTypes.array,
		userId: PropTypes.number,
		uuid: PropTypes.string.isRequired
	}

	render () {
		const {title, body, uuid, image, demoVideo} = this.props
		if (!uuid) {
			return (
				<div>The requested template was not found.</div>
			)
		}

		const videoId = demoVideo[0].uri.substr(demoVideo[0].uri.search('v=') + 2)

		const imgSrc = image && image[0] ? image[0].uri : require('images/dummy.png')
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
						{title}
					</Card.Header>
					<Card.Meta>
						<span className="date">
							Template `id` is {uuid}
						</span>
					</Card.Meta>
					<Card.Description>
						{body.split(' ').slice(0, 50).join(' ')} ...
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<div className="ui two buttons">
						<Button animated="vertical" color="orange" as={Link} to={`/project/new/${uuid}`}>
							<Button.Content visible>Create my own <Icon name='right arrow' /></Button.Content>
							<Button.Content hidden>Create my own <Icon name='right arrow' /></Button.Content>
						</Button>
						<Button basic color="green" disabled>
							More info
						</Button>
					</div>
				</Card.Content>
			</Card>
		)
	}
}

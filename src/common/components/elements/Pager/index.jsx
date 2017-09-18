import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class Pager extends Component {
	static propTypes = {
		totalPages: PropTypes.number,
		handlePageClick: PropTypes.func,
		currentPage: PropTypes.number,
		pathPrefix: PropTypes.string
	}

	handleItemClick = this.props.handlePageClick

	render () {
		const { totalPages, currentPage, pathPrefix } = this.props
		const menuItems = Array.from(Array(totalPages)).map((val, index) => {
			return (
				currentPage === index + 1
					? <Menu.Item
						name={(String)(index + 1)}
						active={true}
						key={index} />
					: <Menu.Item
						name={(String)(index + 1)}
						active={false}
						as={Link}
						to={`/${pathPrefix}/${index + 1}`}
						key={index} />
			)
		})

		return (
			<Menu pagination>
				{menuItems}
			</Menu>
		)
	}
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'

export default class Pagination extends Component {
	static propTypes = {
		totalPages: PropTypes.number,
		handlePageClick: PropTypes.func,
		currentPage: PropTypes.number
	}

	handleItemClick = this.props.handlePageClick

	render () {
		const { totalPages, currentPage } = this.props
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
						onClick={this.handleItemClick}
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

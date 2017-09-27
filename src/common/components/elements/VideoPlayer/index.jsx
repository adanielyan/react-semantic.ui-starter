import PropTypes from 'prop-types'
import { Embed } from 'semantic-ui-react'

export default class VideoPlayer extends Embed {
	getSrc () {
		const {
		  autoplay = true,
		  brandedUI = false,
		  color = '#444444',
		  hd = true,
		  controls = 1,
		  showinfo = 0,
		  rel = 0,
		  id,
		  source,
		  url
		} = this.props

		if (source === 'youtube') {
		  return [
				`//www.youtube.com/embed/${id}`,
				'?autohide=true',
				`&amp;autoplay=${autoplay}`,
				`&amp;color=${encodeURIComponent(color)}`,
				`&amp;hq=${hd}`,
				'&amp;jsapi=false',
				`&amp;modestbranding=${brandedUI}`,
				`&amp;showinfo=${showinfo}`,
				`&amp;rel=${rel}`,
				`&amp;controls=${controls}`
		  ].join('')
		}

		if (source === 'vimeo') {
		  return [
				`//player.vimeo.com/video/${id}`,
				'?api=false',
				`&amp;autoplay=${autoplay}`,
				'&amp;byline=false',
				`&amp;color=${encodeURIComponent(color)}`,
				'&amp;portrait=false',
				'&amp;title=false'
		  ].join('')
		}

		return url
	  }
}

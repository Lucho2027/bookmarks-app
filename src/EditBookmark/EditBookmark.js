import React, { Component } from "react"
import BookmarksContext from "../BookmarksContext"
import config from "../config"
import PropTypes from "prop-types"
import "./EditBookmark.css"

const Required = () => <span className="EditBookmark__required">*</span>

class EditBookmark extends Component {
	static propTypes = {
		match: PropTypes.shape({
			params: PropTypes.shape({
				bookmarkId: PropTypes.string
			})
		})
	}
	static contextType = BookmarksContext

	state = {
		bookmark: {},
		error: null
	}

	componentDidMount() {
		const bookmark = this.context.bookmarks.find(
			bookmark => bookmark.id == this.props.match.params.bookmarkId
		)
		if (bookmark) {
			this.setState({ bookmark })
		}
	}

	handleSubmit = event => {
		event.preventDefault()
		// get the form fields from the event
		const { name, url, description, rating } = event.target

		const form = event.target
		const bookmark = {
			name: name.value,
			url: url.value,
			description: description.value,
			rating: parseInt(rating.value),
			id: this.state.bookmark.id
		}
		this.setState({ error: null })
		fetch(config.API_ENDPOINT + `/${bookmark.id}`, {
			method: "PATCH",
			body: JSON.stringify(bookmark),
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${config.API_KEY}`
			}
		})
			.then(() => {
				form.reset()

				this.context.updateBookmark(bookmark)
				this.props.history.push("/")
			})
			.catch(error => {
				this.setState({ error })
			})
	}

	handleClickCancel = () => {
		this.props.history.push("/")
	}

	render() {
		const { error } = this.state
		console.log("STATE:", this.state)
		console.log("CONTXT:", this.context)
		console.log("PROP:", this.props)
		return (
			<section className="EditBookmark">
				<h2>Edit a bookmark</h2>
				<form className="EditBookmark__form" onSubmit={this.handleSubmit}>
					<div className="EditBookmark__error" role="alert">
						{error && <p>{error.message}</p>}
					</div>
					<div>
						<label htmlFor="name">
							Title <Required />
						</label>
						<input
							type="text"
							defaultValue={this.state.bookmark.name}
							id="name"
							placeholder="Great website!"
							required
						/>
					</div>
					<div>
						<label htmlFor="url">
							URL <Required />
						</label>
						<input
							type="url"
							name="url"
							defaultValue={this.state.bookmark.url}
							id="url"
							placeholder="https://www.great-website.com/"
							required
						/>
					</div>
					<div>
						<label htmlFor="description">Description</label>
						<textarea
							type="text"
							name="description"
							id="description"
							value={this.state.bookmark.description}
							onChange={e =>
								this.setState({
									bookmark: {
										...this.state.bookmark,
										description: e.target.value
									}
								})
							}
						/>
					</div>
					<div>
						<label htmlFor="rating">
							Rating <Required />
						</label>
						<input
							type="number"
							name="rating"
							id="rating"
							defaultValue={this.state.bookmark.rating}
							min="1"
							max="5"
							required
						/>
					</div>
					<div className="EditBookmark__buttons">
						<button type="button" onClick={this.handleClickCancel}>
							Cancel
						</button>{" "}
						<button type="submit">Edit</button>
					</div>
				</form>
			</section>
		)
	}
}

export default EditBookmark

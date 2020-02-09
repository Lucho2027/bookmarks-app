import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Rating from "../Rating/Rating"
import BookmarksContext from "../BookmarksContext"
import config from "../config"
import "./BookmarkItem.css"

function deleteBookmarkRequest(id, cb) {
	fetch(config.API_ENDPOINT + `/${id}`, {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${config.API_KEY}`
		}
	})
		.then(res => {
			if (!res.ok) {
				return res.json().then(error => Promise.reject(error))
			}
		})
		.then(data => {
			cb(id)
		})
		.catch(error => {
			console.error(error)
		})
}

export default function BookmarkItem(props) {
	return (
		<BookmarksContext.Consumer>
			{context => (
				<li className="BookmarkItem">
					<div className="BookmarkItem__row">
						<h3 className="BookmarkItem__name">
							<a href={props.url} target="_blank" rel="noopener noreferrer">
								{props.name}
							</a>
						</h3>
						<Rating value={props.rating} />
					</div>
					<p className="BookmarkItem__description">{props.description}</p>
					<div className="BookmarkItem__buttons">
						<button>
							<Link to={`/edit/${props.id}`}>Edit</Link>{" "}
						</button>

						<button
							className="BookmarkItem__description"
							onClick={() =>
								deleteBookmarkRequest(props.id, context.deleteBookmark)
							}
						>
							<Link to={"/"}>Delete</Link>
						</button>
					</div>
				</li>
			)}
		</BookmarksContext.Consumer>
	)
}

BookmarkItem.defaultProps = {
	onClickDelete: () => {}
}

BookmarkItem.propTypes = {
	id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	desciption: PropTypes.string,
	rating: PropTypes.number.isRequired,
	onClickDelete: PropTypes.func
}

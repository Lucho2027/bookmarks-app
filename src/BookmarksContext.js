import React from "react";

const BookmarksContext = React.createContext({
  bookmarks: [],
  addBookmar: () => {},
  deleteBookmark: () => {}
});
export default BookmarksContext;

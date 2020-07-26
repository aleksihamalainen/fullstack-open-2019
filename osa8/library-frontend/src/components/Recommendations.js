import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = (props) => {
  const bookResult = useQuery(ALL_BOOKS);
  const meResult = useQuery(ME);

  const books = bookResult.data ? bookResult.data.allBooks : [];
  const favorite = meResult.data ? meResult.data.me.favoriteGenre : null;
  const booksToShow = favorite
    ? books.filter((book) => book.genres.includes(favorite))
    : [];

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{favorite}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;

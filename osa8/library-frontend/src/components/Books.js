import React, { useState } from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  }

  const books = result.data ? result.data.allBooks : [];
  let genres = [];

  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres = genres.concat(genre);
      }
    });
  });

  const booksToShow = genre
    ? books.filter((book) => book.genres.includes(genre))
    : books;

  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <div>
          in genre <b>{genre}</b>
        </div>
      ) : null}
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
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;

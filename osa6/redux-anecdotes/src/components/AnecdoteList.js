import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch();

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  const filteredAnecdotes = filter === '' ? sortedAnecdotes : anecdotes.filter(a => a.content.toLowerCase().includes(filter))

  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
  };
  return filteredAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;

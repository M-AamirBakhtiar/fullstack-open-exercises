import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const MaxVotes = ({ votes, anecdotes }) => {
  let arr = Object.values(votes);
  let max = Math.max(...arr);
  let highVote;

  for (const key in votes) {
    if (votes[key] === max) {
      highVote = key;
    }
  }

  if (max === 0) {
    return <p>no votes</p>;
  }

  return (
    <>
      <p>{anecdotes[highVote]}</p>
      <p>has {max} votes</p>
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  const handleRandomAnecdote = () => {
    const rand = Math.floor(Math.random() * 6);

    setSelected(rand);
  };

  const handleVote = () => {
    setVotes({ ...votes, [selected]: votes[selected] + 1 });
  };

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleRandomAnecdote}>next anecdote</button>
      <h2>Anecdote with the most votes</h2>
      <MaxVotes votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

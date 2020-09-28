import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value, children }) => {
  return (
    <>
      <p>
        {text} {value}
        {children}
      </p>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <p>No Feedback Given</p>
      </>
    );
  }
  const total = good + neutral + bad;
  const avgScore = (good - bad) / total;
  const positivePercentage = (good / total) * 100;
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <Statistic text="good" value={good} />
          </td>
        </tr>
        <tr>
          <td>
            <Statistic text="neutral" value={neutral} />
          </td>
        </tr>
        <tr>
          <td>
            <Statistic text="bad" value={bad} />
          </td>
        </tr>
        <tr>
          <td>
            <Statistic text="all" value={total} />
          </td>
        </tr>
        <tr>
          <td>
            <Statistic text="average" value={avgScore} />
          </td>
        </tr>
        <tr>
          <td>
            <Statistic text="positive" value={positivePercentage}>
              {' '}
              %
            </Statistic>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

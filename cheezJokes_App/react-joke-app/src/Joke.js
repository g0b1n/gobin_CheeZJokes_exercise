// render each jokes
import React, { useState } from 'react'
import './Joke.css'

function Joke({ id, vote, votes, text }) {
  return (
    <div className='Joke'>
        <div className='Joke-votearea'>
            <button onClick={() => vote(id, +1)}>
                <i className='fas fa-thumbs-up'>👍</i>
            </button>

            <span className='votes'>{votes}</span>

            <button onClick={() => vote(id, -1)}>
                <i className='fas fa-thumbs-down'>👎</i>
            </button>
        </div>
      <div className='Joke-text'>{text}</div>
    </div>
  );
}

export default Joke;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joke from './Joke';

import './JokeList.css'


function JokeList(props) {

    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // sort joke by vote
    const sortedJokes = jokes.slice().sort((a, b) => b.votes - a.votes);

    const fetchJokes = async () => {
        setIsLoading(true);

        let fetchedJokes = [];
        let seenJokes = new Set();
        try {
            // fetch until we have 5 jokes
            while (fetchedJokes.length < 5){
                const result = await axios.get(`https://icanhazdadjoke.com`, {
                    headers: { Accept: 'application/json'}
                });

                let joke = result.data;

                // check for the unique joke
                if (!seenJokes.has(joke.id)){
                    seenJokes.add(joke.id);
                    // add uniqie joke
                    fetchedJokes.push({...joke, votes: 0});
                }
            }
            setJokes(fetchedJokes);
        } catch (error) {
            console.error('Error fetching jokes:', error);
            setError(error);
        }
        
        setIsLoading(false);
    }

    useEffect(() => {
        fetchJokes();
    }, []);

    const vote = (id, delta) => {
        setJokes(jokes => jokes.map(joke =>
            joke.id === id ? {...joke, votes: joke.votes + delta} : joke
        ));
    }
 
  return (
    <div className='JokeList'>
        <h1>Get Jokes</h1>
        <button onClick={fetchJokes}>Get New Joke</button>
        {isLoading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>Error Loading Jokes!</div>
        ) : (
            <div>
                {sortedJokes.map((joke) => (
                    // display each joke 
                    <Joke
                        key={joke.id}
                        id={joke.id}
                        votes={joke.votes}
                        text={joke.joke}
                        vote={vote}
                    />
                ))}
            </div>
        )}
    </div>
  )
}

export default JokeList;

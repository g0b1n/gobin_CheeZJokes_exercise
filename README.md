- When the page loads, it display a spinner until joke data has loaded from the API.
- The application fetches 5 jokes, making sure that no joke appears more than once on the page. When 5 jokes have been loaded, the spinner disappears.
- The application lists the jokes, along with a “vote-up” button, a “vote-down” button, and the net score *(up - down)* for each joke. Users can vote, and the net score updates.

Firs the application is written using class components. I had to refactor the app to use functional components with hooks.

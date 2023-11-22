
# Finance App

This is a project that aims to offer a responsive dashboard panel for a list of transactions.
The key features is the the ability to list transactions in a paginated table with key filters. It is also possible to view graphs that summarize this data.
## Installation
Clone this repo
```bash
npm install && npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack
The project is built on top of Next 14 and takes advantage of all embedded technology, such as Server Functions and Server Components, with some SOLID priciples, Clean Code and Typescript
- Next 14
- Typescript
- MUI + Joy
- Google Charts

## Structure
The Project consists of 3 main pages: Login, Dashboard and Charts. If the user is not logged in, he will be automatically redirected to login. The session is persisted through a "token" cookie (which stores name and email, both encoded), and simulates a JWT. If the token does not exist, it is automatically redirected via Middleware. It's a simple local approach, but it's the foundation of any web authentication and can be expanded any time soon. Additionally, filters are persisted via URL.
\
There are some helpers that 
## Caveats
The project doesn't have tests (yet), but was built on the SOLID acronym S, single responsibility, to separate the presentation layer from the model business layer. This makes testing easier and more reliable in the future.



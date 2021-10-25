import { useState } from "react";
import './App.css';

function App() {
  const [authorEmail, setAuthorEmail] = useState('');
  const [isbn, setIsbn] = useState('');
  const [books, setBooks] = useState([]);
  const [magazines, setMagazines] = useState([]);

  const handleAuthorEmailInput = (e) => {
    setAuthorEmail(e.target.value);
  };

  const handleIsbnInput = (e) => {
    setIsbn(e.target.value) ;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const mags = await (await fetch(`http://localhost:3000/magazines/${encodeURIComponent(authorEmail)}`)).json()
    setMagazines(mags);
  }

  const handleIsbnSubmit = async (e) => {
    e.preventDefault();
    const data = await (await fetch(`http://localhost:3000/books/${isbn}`)).json()
    console.log(data);
    setBooks(data);
  }

  return (
    <div className="App">
      <input className="email" type="email" onChange={handleAuthorEmailInput} placeholder="Author email" /> 
      <button onClick={handleEmailSubmit}>Fetch Authors</button>
      <div className="magazines">{magazines.map((magazine, index) => {
        return <div key={index}>{JSON.stringify(magazine)}</div>
      })}</div>
      <input type="text" onChange={handleIsbnInput} placeholder="ISBN" /> 
      <button onClick={handleIsbnSubmit}>Fetch Books</button>
      <div className="books">{books.map((book, index) => {
        return <div key={index}>{JSON.stringify(book)}</div>
      })}</div>
    </div>
  );
}

export default App;

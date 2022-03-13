import logo from './logo.svg';
import {useEffect, useState} from "react";
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  const [user, setUser] = useState({
    name: "",
    bio: "",
    avatar : "",
  });
  console.log('state user', user)
  const [repoList, setRepoList] = useState({})

  useEffect(() => {
    fetch("https://api.github.com/users/Brianrahmarela")
    .then((res) => res.json())
    .then (
      (result) => {
        console.log(result)
        setUser((prev) => ({...prev, 
          name: result.name,
          bio: result.bio,
          avatar: result.avatar_url,
        }))
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])
  
  return (
    <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex">
     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={user.avatar} />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
          {user.bio}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
  );
}

export default App;

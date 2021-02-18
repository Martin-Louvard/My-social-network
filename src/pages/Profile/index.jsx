import React from 'react';
import Cookies from 'js-cookie';
import Post from '../../components/Posts'



const Profile = () => {
  const [id, setId] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [newusername, setNewUsername] = React.useState(username);
  const [newdescription, setNewDescription] = React.useState(description);
  const [posts, setPosts] = React.useState({});

  const getPosts = () => {
    fetch(`http://localhost:1337/posts?user.id=${id}`, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return response
      })
      .then((response) => setPosts(response))
  }

  const handleChangeUsername = (event) => {
    setNewUsername(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setNewDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: newusername,
      description: newdescription
    };

    fetch(`http://localhost:1337/users/me`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })


  };



  fetch('http://localhost:1337/users/me', {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${Cookies.get('jwt')}`,
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then((response) => {
      setId(response.id);
      setUsername(response.username);
      setEmail(response.email);
      setDescription(response.description);
    })

    React.useEffect(() => {
      getPosts();
  },[id])

  return (
    <div className="Profile">
      <h1>Mon profil </h1>
      <p>Id: {id}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Description: {description}</p>

      <h1>Modifier mon profil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username :
          <input type="text" value={newusername} onChange={handleChangeUsername} placeholder={username} />
        </label>
        <label>
          Description :
          <input type="text" value={newdescription} onChange={handleChangeDescription} placeholder={description} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>

      <h1>Mes Posts: </h1>
            <div>{Object.keys(posts).map(function (key) {
                        return <Post value={posts[key]} />
                    })}</div>
    </div>

  );
}

export default Profile
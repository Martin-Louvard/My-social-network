import React from 'react';
import Cookies from 'js-cookie';
import { useParams } from "react-router-dom";
import Post from '../../components/Posts'

const User = ()=>{
    const {userId} = useParams();
    const [id, setId] = React.useState(userId);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [description, setDescription] = React.useState("");
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



      fetch(`http://localhost:1337/users/${id}`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${ Cookies.get('jwt')}`, 
          'Content-Type': 'application/json'
        },
      })
      .then((response)=>response.json())
        .then ((response)=>{
            setId(response.id);
            setUsername(response.username);
            setEmail(response.email);
            setDescription(response.description);
        })

        React.useEffect(() => {
          getPosts();
      },[])
     
    return (
        <div className="User">
            <h1>Profil de {username} </h1>
            <p>Id: {id}</p>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Description: {description}</p>
            <h1>Posts des utilisateurs: </h1>
            <div>{Object.keys(posts).map(function (key) {
                        return <Post value={posts[key]} />
                    })}</div>
                    
        </div>
    );
}

export default User
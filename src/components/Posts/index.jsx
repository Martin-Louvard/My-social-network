import { checkAuth } from '../PrivateRoute';
import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';



const Post = (props) => {
  const [like, setLike] = React.useState(props.value.like)
  const [userId, setUserId] = React.useState(null);

  const handleClick = () => {
    setLike(like + 1)


    const data = {
      like: like,
    };

    fetch(`http://localhost:1337/posts/${props.value.id}`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  const handleClickDelete = () => {
    fetch(`http://localhost:1337/posts/${props.value.id}`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`,
      }
    })
  }


  const getPersonalInfos = () => {
    fetch('http://localhost:1337/users/me', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => setUserId(response.id))
  };

  React.useEffect(() => {
    getPersonalInfos()
  }, [])




  return (
    <div>
      <p>{props.value.text}</p>
      {checkAuth() ?
        <div>
          <p><em>By         <Link to={`/users/${props.value.user.id}`}>{props.value.user.username}</Link> </em></p>
          <button onClick={handleClick}>Like: {like}</button>
          {(userId === props.value.user.id)?  <button onClick={handleClickDelete}>Delete this post</button>: ""}
        </div>
        : ""}

    </div>
  )
}

export default Post
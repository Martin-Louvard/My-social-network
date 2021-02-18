import React from 'react';
import { checkAuth } from '../../components/PrivateRoute';
import Cookies  from 'js-cookie';
import Post from '../../components/Posts';

const Home = () => {
    const [content, setContent] = React.useState("");
    const [id, setId] = React.useState("");
    const [posts, setPosts] = React.useState({});

    const handleChangeContent = (element) => {
        setContent(element.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        
        const data = {
            text: content,
            user: id
        };

        console.log(data)

        fetch('http://localhost:1337/posts', {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    };

    const getPosts = () => {
        fetch("http://localhost:1337/posts", {
            method: 'get',

        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                return response
            })
            .then((response) => setPosts(response))

            fetch('http://localhost:1337/users/me', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((response)=>{
                console.log(response);
                return response
            })
            .then((response) => {
                setId(response.id);
          
            })
    }

    React.useEffect(() => {
        getPosts();
    },
        [])



    return (
        <div>
            <h1>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</h1>
            {checkAuth() ?
                <div>
                    <h2>Poster une publication:</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Votre contenu :
          <input type="text" value={content} onChange={handleChangeContent} placeholder="Que voulez vous dire?" />
                        </label>
                        <input type="submit" value="Envoyer" />
                    </form>
                    <h1>Posts des utilisateurs: </h1>
                    {Object.keys(posts).map(function (key) {
                        return <Post value={posts[key]} />
                    })}

                </div>
                :
                <div>
                    <h1>Posts des utilisateurs: </h1>

                    {Object.keys(posts).map(function (key) {
                        return <Post value={posts[key]} />
                    })}
                </div>
            }
        </div>
    );
};

export default Home;
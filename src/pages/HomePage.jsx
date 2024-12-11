import { useState, useEffect } from 'react'
import axios from 'axios';

const API_BASE_URI = 'http://localhost:3000/'

export default function HomePage() {


    const [posts, setPosts] = useState([])
    const [error, setError] = useState('')
    const [post, setPost] = useState(null)

    useEffect(() => {
        async function fetchAllPosts() {
            try {
                const response = await axios.get(`${API_BASE_URI}posts`)
                setPosts(response.data)
            } catch (error) {
                console.error(error)
                setError('Errore nel recuperare la lista dei post')
            }
        }

        fetchAllPosts();
    }, []);

    function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }

    let randomInt = getRandomInt(1, posts.length)


    useEffect(() => {
        
        if (posts.length > 0) {
            const filteredPost = posts.find(post => post.id === randomInt)
            setPost(filteredPost || null)
        }
    }, [posts])

    return (
        <>
            {post ? (
                <div>
                    <h2>{post.title}</h2>
                    <img src={`${API_BASE_URI}imgs/posts/${post.image}`} alt="" />
                </div>
            ) : (
                <p>Post non trovato per l'ID {randomInt}.</p>
            )}
        </>
    )
}

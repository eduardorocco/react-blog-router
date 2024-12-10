import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const API_BASE_URI = 'http://localhost:3000/'

export default function PostDetail() {
    const { postId } = useParams()  
    const [post, setPost] = useState(null)  
    const [error, setError] = useState(null)  

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get(`${API_BASE_URI}posts/${postId}`)
                setPost(response.data)
            } catch (error) {
                console.error(error)
                setError('Nessun post trovato')
            }
        }

        fetchPost() 
    }, [postId])  

   
    if (error) {
        return <div>{error}</div>  
    }

    if (!post) {
        return <div>Post non trovato</div> 
    }

    const {title, content, image} = post
    return (
        <div>
            <h1>{title}</h1>
            <img src={`${API_BASE_URI}imgs/posts/${image}`}/>
            <p>{content}</p>
        </div>
    )
}


import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import style from './PostDetail.module.css'

const API_BASE_URI = 'http://localhost:3000/'

export default function PostDetail() {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [posts, setPosts] = useState([])
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

        async function fetchAllPosts() {
            try {
                const response = await axios.get(`${API_BASE_URI}posts`)
                setPosts(response.data)
            } catch (error) {
                console.error(error)
                setError('Errore nel recuperare la lista dei post')
            }
        }

        fetchPost()
        fetchAllPosts()
    }, [postId])


    if (error) {
        return <div>{error}</div>
    }

    if (!post) {
        return <div>Post non trovato</div>
    }

    const currentIndex = posts.findIndex(p => p.id === parseInt(postId))
    const prevPost = posts[currentIndex - 1]
    const nextPost = posts[currentIndex + 1]

    const { title, content, image, tags } = post

    return (
        <div className='container'>
            <div className={style.row}>
            <h1>{title}</h1>
            <img className={style.image} src={`${API_BASE_URI}imgs/posts/${image}`} />
            <div className={style.tagContainer}>
                {tags.map(tag => (
                    <div>{tag}</div>
                )
                )}
            </div>
            <h2>Descrizione:</h2>
            <p>{content}</p>

            <div className={style.btnContainer}>
                {prevPost && (
                    <Link to={`/our-recipes/${prevPost.id}`} className={style.btn} >
                        Post Precedente
                    </Link>
                )}

                {nextPost && (
                    <Link to={`/our-recipes/${nextPost.id}`} className={style.btn} >
                        Prossimo Post
                    </Link>
                )}
            </div>
            </div>
        </div>
    )
}


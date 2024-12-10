import style from './Main.module.css'
import Card from "../Card/Card"
import { posts } from '../../data/posts'
import { useEffect, useState } from 'react'
import axios from 'axios'

const initialFormData = {
    id: '',
    title: '',
    image: '',
    content: '',
    tags: '',
    published: true
}

export const API_BASE_URI = 'http://localhost:3000/'

export default function Main() {
    const [publishedPosts, setPublishedPosts] = useState(posts.filter((post) => post.published === true))
    const [formData, setFormData] = useState(initialFormData)

    function handleFormData(e) {
        const key = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        setFormData({
            ...formData,
            [key]: value,
        });
    }

    function fetchPosts() {
        axios.get(`${API_BASE_URI}posts`)
            .then(res => {
                setPublishedPosts(res.data)
            })
            .catch(error => {
                console.error('Error fetching posts:', error)
            })
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    function addPost(event) {
        event.preventDefault()

        if (formData.title.trim() === '') return

        const newPost = {
            id: Date.now(),
            ...formData,
            tags: formData.tags.split(',').map((tag) => tag.trim())
        }

        axios.post(`${API_BASE_URI}posts`, newPost)
            .then(res => {
                setPublishedPosts(prevPosts => [...prevPosts, res.data])
            })
            .catch(error => {
                console.error('Error adding post:', error)
            })

        setFormData(initialFormData)
    }

    function deletePost(id) {

        setPublishedPosts(publishedPosts.filter(post => post.id !== id))

        axios.delete(`${API_BASE_URI}posts/${id}`)
        .then(() => {
            
            setPublishedPosts(posts => posts.filter(post => post.id !== id))
        })
        .catch(error => {
            console.error('Error deleting post:', error)
        })
}

    return (
        <main>
            <div className="container">
                <form onSubmit={addPost} className={style.form}>
                    <h2>Aggiungi un nuovo post</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="Titolo del post"
                        value={formData.title}
                        onChange={handleFormData}
                    />
                    <input
                        type="text"
                        name="content"
                        placeholder="Contenuto"
                        value={formData.content}
                        onChange={handleFormData}
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Url immagine"
                        value={formData.image}
                        onChange={handleFormData}
                    />
                    <input
                        type="text"
                        name="tags"
                        placeholder="Tags"
                        value={formData.tags}
                        onChange={handleFormData}
                    />
                    <div className={style.checkbox}>
                        <input
                            type="checkbox"
                            name="published"
                            checked={formData.published}
                            onChange={handleFormData}
                        />
                        <label htmlFor="checkbox">Pubblica</label>
                    </div>

                    <input className={style.submit} type="submit" />
                </form>
            </div>
            <div className="container">
                <h1>Le nostre ricette</h1>
                <div className={style.row}>
                    {publishedPosts.map((post) => (
                        <div key={post.id} className="col-6">
                            <Card
                                title={post.title}
                                content={post.content}
                                tags={post.tags}
                                image={`${API_BASE_URI}imgs/posts/${post.image}`}
                                onDelete={() => deletePost(post.id)}
                                postId= {post.id}
                                 />
                                
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

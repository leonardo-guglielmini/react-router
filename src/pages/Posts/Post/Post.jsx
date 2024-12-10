import placeholderImg from "../../../assets/placeholder.webp"
import loadingImg from "../../../assets/loading.gif"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import style from "./post.module.css"

const API_BASE_URI = 'http://localhost:3000/'

export default function Post(){

    const [post, setPost] = useState(null)

    const {id} = useParams()

    useEffect(() =>{
        axios.get(`${API_BASE_URI}posts/${id}`)
        .then((res) =>{
            setPost(res.data)
            //console.log(res.data)
        })
        .catch((err) =>{
            console.error(err)
        })
    },[id])

    return(
        <main className={style.mainContent}>
            <div className="container">
            {
                post ? 
                <div className={style.card}>
                    <div className={style.cardImg}>
                        <img src={post.image ? `${API_BASE_URI}/imgs/posts/` + post.image : placeholderImg}></img>
                    </div>
                    <div className={style.cardBody}>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                    </div>
                </div> :
                <div className={style.loading}>
                    <img src={loadingImg}></img>
                </div>
            }
                
            </div>
        </main>
    )}
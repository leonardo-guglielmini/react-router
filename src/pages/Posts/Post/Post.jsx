import placeholderImg from "../../../assets/placeholder.webp"
import loadingImg from "../../../assets/loading.gif"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import style from "./post.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

const API_BASE_URI = 'http://localhost:3000/'

export default function Post(){

    const [post, setPost] = useState(null)

    let {id} = useParams()

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
                <div className={style.content}>
                    <div> {id > 1 ? <Link to={`/posts/${parseInt(id)-1}`}><FontAwesomeIcon icon={faArrowLeft} className={style.faArrowLeft}/></Link> : <Link to={`/posts`}><FontAwesomeIcon icon={faArrowLeft} className={style.faArrowLeft}/></Link>}</div>
                    <div className={style.card}>
                        <div className={style.cardImg}>
                            <img src={post.image ? `${API_BASE_URI}/imgs/posts/` + post.image : placeholderImg}></img>
                        </div>
                        <div className={style.cardBody}>
                            <h1>{post.title}</h1>
                            <p>{post.content}</p>
                        </div>
                    </div>
                    <div> {id < 5 ? <Link to={`/posts/${parseInt(id)+1}`}><FontAwesomeIcon icon={faArrowRight} className={style.faArrowRight}/></Link> : <Link to={`/posts`}><FontAwesomeIcon icon={faArrowRight} className={style.faArrowRight}/></Link>}</div>
                </div>:
                <div className={style.loading}>
                    <img src={loadingImg}></img>
                </div>
            }
            </div>
        </main>
    )}
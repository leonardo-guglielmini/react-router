import placeholderImg from "../../../assets/placeholder.webp"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const API_BASE_URI = 'http://localhost:3000/'

export default function Post(){

    const [post, setPost] = useState(null)

    const {id} = useParams()

    useEffect(() =>{
        axios.get(`${API_BASE_URI}posts/${id}`)
        .then((res) =>{
            setPost(res.data)
        })
        .catch((err) =>{
            console.error(err)
        })
    },[id])

    return(
        <main>
            <div className="container">
            </div>
        </main>
    )}
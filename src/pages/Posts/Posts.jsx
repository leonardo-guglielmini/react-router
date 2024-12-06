import style from './Posts.module.css'
import Card from "../../components/Card/Card"

import axios from "axios"

import { useState, useEffect/*, useRef*/ } from 'react'

const baseFormData={
    title:"",
    image:"",
    content:"",
    tags:[],
    published:true
}

export const API_BASE_URI = 'http://localhost:3000/'

export default function Posts(){

    let tags=[]
    const [posts, setPosts] = useState([])
    const [postTitle, setPostTitle] = useState("")

    const [formData, setFormData] = useState(baseFormData)

    //const isLoaded = useRef(false);

    function fetchPosts(){
        axios.get(`${API_BASE_URI}posts`)
            .then(res => {
                console.log("fetch posts")
                console.log(res.data)
                setPosts(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchPosts()
    },[])

    /*
    useEffect(() => {
        if(isLoaded.current){
            alert("Toggle Visibilità")
        }
        else{
            isLoaded.current=true;}
            return
    },[formData.published])
    */

    function handleFormData(e){

        const key = e.target.name
        const value = e.target.value
        const type = e.target.type
        const checked = e.target.checked

        setFormData((formData) =>{
            const newFormData = {...formData}

            type === "checkbox" && key =="tags" ? 
            (newFormData.tags = checked ? formData.tags.concat(value) : formData.tags.filter((tag) => tag!==value)) 
            : type === "checkbox" && key ==="published" ? 
            (newFormData.published = checked) 
            : (newFormData[key] = value)

            return newFormData;
        })
    }

    function addNewPost(){

        if(formData.title === "") return

        const newPost ={
            ...formData
        }

        axios.post(`${API_BASE_URI}posts`, newPost)
            .then(res =>{
                console.log(res)
                console.log("post aggiunto correttamente")
                setPosts([...posts, res.data])
                setFormData(baseFormData)
            })
            .catch(err =>{
                console.error(err)
            })

        //console.log(posts)
        fetchPosts()
    }

    function deletePost(id){
        console.log(id)
        axios.delete(`${API_BASE_URI}posts/${id}`)
            .then(()=>{
                fetchPosts()
            })
            .catch(err =>{
                console.error(err)
            })
    }

    function changePostTitle(id){
        if(postTitle === "") return

        setPosts(posts.map(post => 
            post.id === id ? { ...post, title: postTitle } : post
        ));
        setPostTitle("")

        //console.log(posts)
        console.log("Titolo aggiornato correttamente");
    }

    return(
        <main className={style.mainContent}>
            <div className="container">
                <form className={style.form} onSubmit={(e) => {e.preventDefault(); addNewPost()}} action="">
                    <div className={style.formDiv}>
                        <input className={style.formField} id="title" name="title" onChange={handleFormData} type="text" placeholder="Titolo del post" value={formData.title}/>
                    </div>
                    <div className={style.formDiv}>
                        <input className={style.formField} id="content" name="content" onChange={handleFormData} type="text" placeholder="Descrizione del post" value={formData.content}/>
                    </div>
                    <div className={style.formDiv}>
                        <input className={style.formField} id="image" name="image" onChange={handleFormData} type="text" placeholder="URL immagine" value={formData.image}/>
                    </div>
                    <div className={style.formDiv}>
                        <input  id="tag1" name="tags" onChange={handleFormData} type="checkbox" value={"tag1"}/>
                        <label className={style.formCheckbox} htmlFor="tag1">Tag 1</label>
                        <input id="tag2" name="tags" onChange={handleFormData} type="checkbox" value={"tag2"}/>
                        <label className={style.formCheckbox} htmlFor="tag2">Tag 2</label>
                        <input id="tag3" name="tags" onChange={handleFormData} type="checkbox" value={"tag3"}/>
                        <label className={style.formCheckbox} htmlFor="tag3">Tag 3</label>
                    </div>
                    <div className={style.formDiv}>
                        <input id="published" name="published" onChange={handleFormData} checked={formData.published} type="checkbox"/>
                        <label htmlFor="published">Visibile</label>
                    </div>
                    <input className={style.submit} type="submit" value="Invia"/>
                </form>

                <section className={style.row}>
                    {posts.map((post)=>
                        post.published===true ?
                        <div className={style.col3} key={post.id}>
                            <Card deletePost={()=>deletePost(post.id)} changePostTitle={(event)=>changePostTitle(event, post.id)} setPostTitle={(value)=>setPostTitle(value)} title={post.title} image={post.image} content={post.content} tags={post.tags} postTitle={postTitle} id={post.id}/>
                            {post.tags.forEach(tag => !tags.find((el) => el === tag) ? tags.push(tag) : null)}
                        </div> : null
                    )}
                </section>
                <section className={style.tagList}>
                    <h3>Tag presenti</h3>
                    <ul>
                        {tags.map((tag, index) => <li className={`tag ${tag}Tag`} key={index}>{tag}</li> )}
                    </ul>
                </section>
            </div>
        </main>
    )
}
import commonStyle from '../Common.module.css'
import style from './Posts.module.css'

export default function Posts(){
    const posts=[
        {
            title:"Post 1",
            content:"Content 1"
        },
        {
            title:"Post 2",
            content:"Content 2"
        },
        {
            title:"Post 3",
            content:"Content 3"
        },
        {
            title:"Post 4",
            content:"Content 4"
        }
    ]
    return(
        <main>
            <div className="container">
                <section>
                    <h1 className={commonStyle.title}>POSTS</h1>
                </section>
                <section className={style.postsList}>
                    {posts.map((post,i) =>(
                        <div key={i} className={style.post}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </section>
            </div>
            
        </main>
    )
}
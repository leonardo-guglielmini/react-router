import { NavLink } from "react-router-dom"
import style from "./header.module.css"

export default function Header(){
    return(
        <header>
            <ul className={style.navbar}>
                <li>
                    <NavLink to ='/' className={style.navlink}>HOMEPAGE</NavLink>
                </li>
                <li>
                    <NavLink to ='/posts' className={style.navlink}>POSTS</NavLink>
                </li>
                <li>
                    <NavLink to ='/about-us' className={style.navlink}>ABOUT US</NavLink>
                </li>
            </ul>
        </header>
    )
}
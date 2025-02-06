import React from "react";
import { IoMdMenu } from "react-icons/io";
const NavbarMenu =[{
    id:1,
    title: "Home",
    path:"/",
},
{
    id:2,
    title: "Services",
    link:"#",
},
{
    id:3,
    title: "About Us",
    link:"#",
},
{
    id:4,
    title: "Our Team",
    link:"#",
},
{
    id:5,
    title: "Contact Us",
    link:"#",
},
]
const Navbar =()=>{
    return <nav>
        <div className="container py-10">
            { /*Logo section*/ 
            <div>

                <h1 className="font-bold text-2xl">SpeCode Fusion</h1>
            </div>}
            { /*Menu section*/ }
            { /*Mobie Hamburger section*/ }

        </div>
        </nav>;
}
export default Navbar;
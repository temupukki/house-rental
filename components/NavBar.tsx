'use client '

import Link from "next/link"
import { ReactNode } from "react"

type NavItem={
    label:string
    href:string
    icon?:ReactNode;
}
const navItems:NavItem[]=[
    {
        label:"Home",
        href:"/"
    },
      {
        label:"Property",
        href:"/property"
    },
      {
        label:"About us",
        href:"/about"
    },
      {
        label:"Contact us",
        href:"/contact"
    },
    
]
export default function NavBar(){

return(
    <div className="bg-white">
        <nav >
            <Link href="/"><img 
            src="/logo.png" 
            alt=" logo" 
            className="w-20 h-20"
            /></Link>

        </nav>
    </div>
)

}
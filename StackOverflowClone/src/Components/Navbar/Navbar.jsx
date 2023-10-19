import React from 'react';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './style.css'

export default function Navbar() {
  return (
    <div className='navbar-container'>
        <div className='navbar-logo'>
            <Image src='https://www.xda-developers.com/files/2017/05/stack-overflow.png' width='200px' />
        </div>
        <div className='navbar-links'>
            <Button link>About</Button>
            <Button link>Questions</Button>
            <Button link>Tags</Button>
        </div>
        <div className='navbar-searchBar'>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText placeholder="Search" className="w-full" />
            </span>
        </div>
        <div className='navbar-buttons'>
            <Button>Log in</Button>
            <Button>Settings</Button>
            <Button className="p-button-outlined">Sign up</Button>
        </div>
    </div>
  )
}

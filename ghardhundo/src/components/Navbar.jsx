import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import "../css/Navbar.css"
import { useState } from 'react';
import { CiMenuFries } from "react-icons/ci";


const Navbar = () => {

    const [open, setOpen] = useState(false)



    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <a class="navbar-brand" href="#">GharDhundo</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <Link class="nav-link" to="">Home </Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/signup">Signup </Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="propertyform">Sell Property </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

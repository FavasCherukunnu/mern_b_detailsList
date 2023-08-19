import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom'
import { UpdatePage } from './page/UpdatePage';
import App from './App';

export default function RouterHome() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/update/:id' element={<UpdatePage />} />
            </Routes>
        </BrowserRouter>
    )
}

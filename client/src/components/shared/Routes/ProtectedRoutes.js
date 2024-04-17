import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../../redux/features/auth/authAction';
import { Navigate } from 'react-router-dom';
import API from '../../../services/API';

// wrap the route with protected route

const ProtectedRoutes = ({children}) => {
    const dispatch = useDispatch();
    const getUser = async () => {
        try{
            const {data} = await API.get('/auth/current-user');
            // console.log(data);
            if(data?.success) {
                dispatch(getCurrentUser(data));
            }
        }
        catch(error) {
            localStorage.clear();
            console.log(error);
        }
    }
    
    useEffect (() => {
        getUser();
    });

    if(localStorage.getItem('token')) {
        return children;
    }
    else {
        return <Navigate to='/login'/>
    }
}

export default ProtectedRoutes;

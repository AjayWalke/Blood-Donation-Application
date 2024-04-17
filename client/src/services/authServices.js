import React from 'react'
import store from '../redux/store';
import { userLogin, userRegister } from '../redux/features/auth/authAction';
export const handleLogin = (e, email, password, rule) => {
        e.preventDefault();
        if(!rule || !email || !password) {
            return alert('Invalid');
        }
        try {
            console.log(rule, email, password);
            // localStorage.setItem('rule', rule);
            // localStorage.setItem('email', email);
            // localStorage.setItem('password', password);
            store.dispatch(userLogin({email, password, rule}))
        }
        catch(error) {
            console.log(error);
        }
}

export const handleRegister = (e, email, password, rule, name, organisation, hospital, website, address, phone) => {
    e.preventDefault();
    try {
        console.log(email, password, rule, name, organisation, hospital, website, address, phone);
        store.dispatch(userRegister({email, password, rule, name, organisation, hospital, website, address, phone}));
    }
    catch(error) {
        console.log(error);
    }
}

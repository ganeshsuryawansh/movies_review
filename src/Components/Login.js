import React, { useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from 'react-router-dom';
import { where, query, getDocs } from 'firebase/firestore';
import { usersRef } from '../firebase/firebase';
import bcrypt from 'bcryptjs'
import { Appstate } from '../App';
import sweetAlert from 'sweetalert';

const Login = () => {
    // Add this in your component file
    require('react-dom');
    window.React2 = require('react');
    console.log(window.React1 === window.React2);

    const navigate = useNavigate;
    const useAppstate = useContext(Appstate);
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            const quer = query(usersRef, where('mobile', '==', form.mobile));
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);

                if (isUser) {
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name);
                    sweetAlert({
                        title: "Loggedin",
                        icon: "success",
                        buttons: false,
                        timer: 3000
                    })
                    if(useAppstate.Login==true){
                        window.location.href = "/";
                    }
                    //setTimeout(window.location.href = "/", 9000);
                    //window.location.href = "/";
                } else {
                    sweetAlert({
                        title: "Invalid Credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                    })
                }
            })
        } catch (error) {
            /*
            sweetAlert({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 1003000
            })
            console.log(error)
            */
        }
        setLoading(false);
    }
    return (
        <div className='w-full flex flex-col mt-8 items-center'>
            <h1 className='text-xl font-bold'>Login</h1>

            <div class="p-2 w-full md:w-1/3">
                <div class="relative">
                    <label for="email" class="leading-7 text-sm text-gray-400">
                        Mobile Number
                    </label>
                    <input
                        type={'number'}
                        id="message"
                        name="message"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>

                <div class="relative">
                    <label for="email" class="leading-7 text-sm text-gray-400">
                        Password
                    </label>
                    <input
                        type='password'
                        id="message"
                        name="message"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div class="p-2 w-full">
                    <button

                        onClick={login}
                        class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg">
                        {loading ? <TailSpin height={25} color="white" /> : 'Login'}
                    </button>
                </div>
                <div>
                    <p>Do not have account? <Link to={'/signup'}><span className='text-blue-500'>Signup</span></Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;
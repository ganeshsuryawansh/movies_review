import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import React,{ useContext } from 'react';
import { Appstate }from '../App'

const Header = () => {
    const useApptate = useContext(Appstate);
    return (
        <div className='sticky z-10 header top-0 text-4xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500'>
            <Link to={"/"}>
                <span>Movies<span className='text-white'>Review</span></span>
            </Link>

            {useApptate.login ?
                <Link to={"/AddMovie"}>
                    <h1 className='text-lg text-white flex cursor-pointer'><Button className='text-white'><AddIcon className='mr-1' color='secondary' /> <span className='text-white'>Add New</span></Button></h1>
                </Link>
                : <Link to={"/Login"}>
                    <h1 className='text-lg bg-green-500 flex cursor-pointer'><Button className='text-white'><span className='text-white'>Login</span></Button></h1>
                </Link>
            }
        </div>
    )
}

export default Header
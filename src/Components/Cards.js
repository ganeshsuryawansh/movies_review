import { getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Cards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getdata() {
            setLoading(true);
            const _data = await getDocs(moviesRef);
            console.log(_data)
            _data.forEach((doc) => {
                setData((prv) => [...prv, { ...(doc.data()), id: doc.id }])
            })
            setLoading(false);
        }
        getdata();
    }, []);


    return (
        <div className='flex flex-wrap justify-between p-3 mt-4'>

            {loading ? <div className='w-full flex justify-center items-center'><ThreeDots /></div> :
                data.map((e, i) => {
                    return (
                        <Link to={`/Detail/${e.id}`}>
                            <div key={i} className='card shadow-lg p-2 hover:-translate-y-5 cursor-pointer mt-3 transition-all duration-500'>
                                <img className='h-60 md:h-72' src={e.image} alt="" />
                                {e.title}
                                <h1 className='flex items-center mr-2'><span className='text-blue-500'>Rating:</span>
                                    <ReactStars
                                        size={25}
                                        half={true}
                                        value={e.rating/e.rated}
                                        edit={false}
                                    />
                                </h1>
                                <h1><span className='text-blue-500'>Year:</span> {e.year}</h1>
                            </div>
                        </Link>
                    )
                    //console.log(e.title);
                })}
        </div>
    )
}

export default Cards;
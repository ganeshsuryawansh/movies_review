import React from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { ThreeDots } from 'react-loader-spinner';
import Reviews from './Reviews';


const Detail = () => {

    const { id } = useParams();
    const [data, setData] = useState({
        title: "",
        year: "",
        image: "",
        desc: "",
        rating: 0,
        rated: 0
    })

    const [loading, setLoding] = useState(false);

    useEffect(() => {

        async function getData() {
            setLoding(true);
            const _doc = doc(db, "movies", id);
            const _data = await getDoc(_doc);
            setData(_data.data());
            setLoding(false);

        }
        getData();
    }, []);

    return (
        <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>
            {loading ? <ThreeDots /> : <>
                <img className='h-96 mt-4 sticky block md:sticky top-25 ' src={data.image} alt="" />
                <div className='md:ml-4 ml-0 w-full mt-2 md:w-1/2'>
                    <h1 className='text-3xl font-bold text-gray-400'>{data.title} <span className='text-xl'>({data.year})</span></h1>
                    <ReactStars
                        size={25}
                        half={true}
                        value={data.rating / data.rated}
                        edit={false}
                    />
                    <p className='mt-2'>{data.desc}</p>
                    <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
                </div>
            </>
            }
        </div>
    )
}

export default Detail
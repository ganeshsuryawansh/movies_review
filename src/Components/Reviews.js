import React from 'react'
import ReactStars from 'react-stars'
import { useState, useEffect, useContext } from 'react'
import { reviewsRef, db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import sweetAlert from "sweetalert";
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Reviews = ({ id, prevRating, userRated }) => {
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [form, setForm] = useState("");
    const [data, setData] = useState([]);
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const [newAdded, setNewAdded] = useState(0);
    const sendReview = async () => {
        setLoading(true);

        try {
            if (useAppstate.login) {

                await addDoc(reviewsRef, {
                    movieid: id,
                    name: useAppstate.userName,
                    rating: rating,
                    thought: form,
                    timestamp: new Date().getTime()
                })
                const ref = doc(db, "movies", id);
                await updateDoc(ref, {
                    rating: prevRating + rating,
                    rated: userRated + 1
                })
                setRating(0);
                setForm("");
                setNewAdded(newAdded + 1);
                sweetAlert({
                    title: "Successfully save",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                })
            }
            else {
                navigate('/login');
            }
        } catch (error) {
            sweetAlert({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        async function getData() {
            setReviewsLoading(true);
            setData([]);
            const quer = query(reviewsRef, where('movieid', '==', id));
            const querySnapShot = await getDocs(quer);

            querySnapShot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setReviewsLoading(false);
        }
        getData();
    }, [newAdded]);

    return (
        <div className='mt-2 w-full border-t-2 border-gray-700 w-full'>
            <ReactStars
                size={30}
                half={true}
                value={rating}
                onChange={(rate) => setRating(rate)}
            />
            <input
                value={form}
                onChange={(e) => setForm(e.target.value)}
                placeholder='Share Your Thoughts....'
                className='w-full p-2 outline-none header'
                required={true}
            />
            <button onClick={sendReview} className='bg-green-600 mt-0 w-full p-1 flex justify-center'>
                {loading ? <TailSpin height={30} color='white' /> : 'Share'}
            </button>
            {
                reviewsLoading ? <div className='mt-6 flex justify-center'><ThreeDots height={15} /></div> :
                    <div>
                        {
                            data.map((e, i) => {
                                return (<>

                                    <div className='bg-gray-900 mt-4 p-1 ' key={i}>
                                        <div className='flex'>
                                            <p className='text-blue-500'>{e.name}</p>
                                            <p className='ml-5 text-xs'>{new Date(e.timestamp).toLocaleString()}</p>

                                        </div>
                                        <ReactStars
                                            size={15}
                                            half={true}
                                            edit={false}
                                            value={e.rating}
                                            onChange={(rate) => setRating(rate)}
                                        />
                                        <p className=''>{e.thought}</p>
                                    </div>
                                </>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Reviews
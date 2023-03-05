import React from "react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import app from "../firebase/firebase";
import sweetAlert from "sweetalert";
import { useNavigate } from "react-router-dom";
import { usersRef } from "../firebase/firebase";
import { addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs/dist/bcrypt";

const auth = getAuth(app);
const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [OTP, setOTP] = useState("");

    const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (Response) => {
                    //
                },
            },
            auth
        );
    };

    const requestOtp = () => {
        setLoading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                sweetAlert({
                    text: "OTP Sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                });
                setOtpSent(true);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const verifyOTP = () => {
        try {
            setLoading(true);
            window.confirmationResult.confirm(OTP).then((result) => {
                uploadData();
                sweetAlert({
                    text: "Sucessfully Registered",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                });
                navigate("/login");
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const uploadData = async () => {
        try {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(form.password, salt);
            await addDoc(usersRef, {
                name: form.name,
                password: hash,
                mobile: form.mobile
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full flex flex-col mt-8 items-center">
            <h1 className="text-xl font-bold">Signup</h1>
            <div class="p-2 w-full md:w-1/3">
                {otpSent ? (
                    <>
                        {" "}
                        <div class="relative">
                            <label for="email" class="leading-7 text-sm text-gray-400">
                                OTP
                            </label>
                            <input
                                id="message"
                                name="message"
                                value={OTP}
                                onChange={(e) => setOTP(e.target.value)}
                                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div class="p-2 w-full">
                            <button
                                onClick={verifyOTP}
                                class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg"
                            >
                                {loading ? (
                                    <TailSpin height={25} color="white" />
                                ) : (
                                    "Confirm OTP"
                                )}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div class="relative">
                            <label for="email" class="leading-7 text-sm text-gray-400">
                                Name
                            </label>
                            <input
                                type={"text"}
                                id="message"
                                name="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <div class="relative">
                            <label for="email" class="leading-7 text-sm text-gray-400">
                                Mobile Number
                            </label>
                            <input
                                type={"number"}
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
                                type="password"
                                id="message"
                                name="message"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div class="p-2 w-full">
                            <button
                                onClick={requestOtp}
                                class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg"
                            >
                                {loading ? (
                                    <TailSpin height={25} color="white" />
                                ) : (
                                    "Request OTP"
                                )}
                            </button>
                        </div>
                    </>
                )}
                <div>
                    <p>
                        Alredy have an account go to{" "}
                        <Link to={"/Login"}>
                            <span className="text-blue-500">Login</span>
                        </Link>
                    </p>
                </div>
            </div>
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default Signup;

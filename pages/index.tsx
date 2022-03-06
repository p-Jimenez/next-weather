import WeatherCard from '../components/weather/WeatherCard';
import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import Searchbar from '../components/search/Searchbar'

const Home: NextPage = () => {


    // get geo location
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [address, setAddress] = useState<string>('');
    const [addressAutocomplete, setAddressAutocomplete] = useState([]);
    const [weather, setWeather] = useState<object[]>([])
    const [errors, setErrors] = useState({});

    const searchbarRef = useRef<HTMLDivElement>(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude)
                    setLng(position.coords.longitude)
                },
                (error) => {
                    setErrors(error.message)
                }
            )
        } else {
            setErrors({
                ...errors,
                geolocation: 'Geolocation is not supported by this browser or access is denied.'
            })
        }
    }

    const getWeather = () => {
        if (lat && lng) {
            axios.get("api/weather", {
                params: {
                    lat: lat,
                    lng: lng
                }
            })
                .then(res => {
                    setWeather(res.data.daily.splice(0, 5));
                })
                .catch(err => {
                    setErrors({
                        ...errors,
                        weather: err.message
                    })
                })
        }
    }

    useEffect(() => {
        // autocomplete address with debounce
        const searchAddress = setTimeout(async () => {
            if (address) {
                const res = await axios.get("api/geocode", {
                    params: {
                        text: address
                    }
                });
                console.log(res.data.data);

                setAddressAutocomplete(res.data.data)
            }
        }, 500);
        return () => clearTimeout(searchAddress);
    }, [address])

    useEffect(() => {
        if (lat && lng) {
            getWeather();
        }
    }, [lat, lng])

    useEffect(() => {
        const searchbar = searchbarRef.current;
        console.log(searchbar);
    }, [])


    const getWeatherByAddress = async (e: MouseEvent, lat: number, lng: number) => {
        e.preventDefault();
        searchbarRef.current?.blur();
        setLat(lat);
        setLng(lng);
    }

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-200 to-sky-600">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="hero ">
                <div className="hero-content text-center flex-col">
                    <div className='max-w-md'>
                        <h1 className="text-6xl font-bold">
                            Weather App
                        </h1>
                    </div>
                    <div>
                        <Searchbar tabIndex={0} text={address} onLocation={getLocation} onChange={(e: any) => setAddress(e.target.value)} />
                        {addressAutocomplete.length > 0 &&
                            <ul tabIndex={0} className="p-2 shadow bg-base-100 rounded-box w-full mt-1 z-50">
                                {addressAutocomplete?.map((item: any, index) =>
                                    <li key={index} className="hover:bg-base-300 rounded-lg px-0.5 py-2">
                                        <a href='' onClick={(e) => getWeatherByAddress(e, item.latitude, item.longitude)}>
                                            {`${item.name} 
                                        ${item.administrative_area != null && item.administrative_area != item.name ? item.administrative_area : ''} 
                                        ${item.region != null && item.region != item.name ? item.region : ''}
                                        - ${item.country}`}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        }
                    </div>
                </div>
            </main>

            <div className='my-4'>
                {weather?.length > 0 &&
                    <div className="flex flex-col md:flex-row items-center justify-center">
                        {weather?.map((item: any, index) =>
                            <WeatherCard weather={item} key={index} />
                        )}
                    </div>
                }
            </div>

        </div>
    )
}

export default Home

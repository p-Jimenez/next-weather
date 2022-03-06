import { useEffect, useState } from "react";


interface WeatherCardProps {
    weather: any;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
    console.log(weather);

    const [color, setColor] = useState({
        text: "",
        background: ""
    });

    useEffect(() => {
        if (weather.temp.day < 10) {
            setColor({
                text: "text-sky-400",
                background: "bg-sky-100"
            });
        } else if (weather.temp.day > 10 && weather.temp.day < 20) {
            setColor({
                text: "text-sky-600",
                background: "bg-sky-200"
            });
        } else if (weather.temp.day > 20 && weather.temp.day < 30) {
            setColor({
                text: "text-orange-600",
                background: "bg-orange-200"
            });
        } else if (weather.temp.day > 30) {
            setColor({
                text: "text-red-600",
                background: "bg-red-200"
            });
        }
    }, [weather.temp.day]);




    return (
        <div className="card bg-base-100 shadow-xl mx-3 my-4 md:my-0 z-0">

            <div className={`${color.text} ${color.background} text-center p-2`}>
                <h1>
                    {weather.temp?.day}°
                   (feels like {weather.feels_like?.day}°)
                </h1>
            </div>
            
            <div className="card-body">
                <h2 className="card-title">
                    {weather.weather[0].main}
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} className="w-11" alt={weather.weather[0].main} />
                </h2>

                <div className="card-actions justify-end">
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
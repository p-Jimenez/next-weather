import axios from 'axios';
import { NextApiResponse } from 'next';
import { NextApiRequest } from "next";

// get weather from openweathermap.org
export default function getWeather(req: NextApiRequest, res: NextApiResponse) {
    // get lat and lon from request
    const { lat, lng } = req.query;

    const cnt = 7;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&cnt=${cnt}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

    axios.get(url).then(response => {
        res.status(200).json(response.data);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
}
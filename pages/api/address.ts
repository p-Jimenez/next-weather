import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


export default function getAddresses(req: NextApiRequest, res: NextApiResponse) { 

    const { text } = req.query;
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${process.env.GEOAPI_API_KEY}`;

    axios.get(url).then(response => {
        res.status(200).json(response.data);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
}
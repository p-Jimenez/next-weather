import { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";


export default function getAddress(req: NextApiRequest, res: NextApiResponse) {

    const { text } = req.query;
    const url = `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITIONSTACK_API_KEY}&query=${text}`;

    console.log(url);
    

    axios.get(url).then(response => {
        res.status(200).json(response.data);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
}
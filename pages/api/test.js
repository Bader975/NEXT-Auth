import * as cheerio from 'cheerio';
import cheerio from 'cheerio';
import axios from 'axios';
export default async function handler(req, res) {

    if (req.method === 'GET') {
        axios.get("https://en.wikipedia.org/wiki/JavaScript").then((response) => {
            const html = response.json()
            console.log(html);
        })
    }
}

const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');
const ws = fs.createWriteStream('written/cmc.csv');

ws.write(`rank, ticker, name, marketCap, price, volume24h, circulatingSupply, ticker2, change24h \n`)

class Coin {
    constructor(rank, ticker, name, marketCap, price, volume24h, circulatingSupply, ticker2, change24h) {
        this.rank = rank;
        this.ticker = ticker;
        this.name = name;
        this.marketCap = marketCap;
        this.price = price;
        this.volume24h = volume24h;
        this.circulatingSupply = circulatingSupply;
        this.ticker2 = ticker2;
        this.change24h = change24h;
    }
}

axios.request('https://coinmarketcap.com/')
    .then(res => {
        const $ = cheerio.load(res.data, {
            normalizeWhitespace: true,
            xmlMode: true
        })
        

        const table = $('tbody')
        table.find('ul').remove();
        const o = table.find('tr').text();
        const outSplit = o.split(' ')
            .filter(e => e !== '' && e !== '*')

        let spliced = [];
        let count = 2;
        let acc = [];

        for (let i = 0; i < outSplit.length; i++) {
            if (outSplit[i] == count) {
                spliced.push(acc);
                acc = [];
                count++;
            }
            acc.push(outSplit[i]);
        }

        let grouped = spliced.map(e => {
            return new Coin( ...e )
        })
        
        grouped.map(e => {
            const {rank, ticker, name, marketCap, price, volume24h, circulatingSupply, ticker2, change24h} = e;

            ws.write(` ${rank}, ${ticker}, ${name}, ${marketCap}, ${price}, ${volume24h}, ${circulatingSupply}, ${ticker2}, ${change24h} \n`)
        })


    })
const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs');


var atags = []
var end = 0;
var index = 0

function load_all_urls(url,limit) {
   
    request(url, (err, res, html) => {
        if (err) {
            console.log(err)
        }
        if (!err && res.statusCode == 200) {
            const $ = cheerio.load(html)
            $('a').each((i, el) => {
                if (atags.length < limit) {
                    atags.push(($(el).attr('href')));
                  
                    if (atags.length == limit) {
                        fs.writeFileSync('./result.txt', atags.join("\n"), (err, res) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                        console.log("Request completed Succesfully")
                        process.exit()
                    }
                }
            })
        }
    })
};

function Recur(limit) {

    while (atags.length <= limit && index < end) {
        if (atags[index]) {
            load_all_urls(atags[index++],limit)
        }
        
    }

}

function load_full_urls(url, callback,limit) {
    request(url, (err, res, html) => {
        if (!err && res.statusCode == 200) {
            const $ = cheerio.load(html)
            $('a').each((i, el) => {
                if (($(el).attr('href')).includes("http", 0)) {
                    atags.push(($(el).attr('href')));
                    end++;
                }
            });
            callback(limit);
        }
    })
}
var limit = 100;
load_full_urls("https://www.npmjs.com/package/cheerio", Recur,limit);








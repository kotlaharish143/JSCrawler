var request = require("request");
var cheerio = require("cheerio");

const fs = require('fs');
var end = 0;
var limit = 100;
var atags = []
var index = 0

function load_full_urls(url, callback1) {
    request(url, (err, res, html) => {
        if (!err && res.statusCode == 200) {
            const $ = cheerio.load(html)
            $('a').each((i, el) => {
                if (($(el).attr('href')).includes("www", 0) || ($(el).attr('href')).includes("http", 0)) {
                    atags.push(($(el).attr('href')));
                    end++;
                }
            });
            callback1();
        }
    })
}



load_full_urls("https://www.npmjs.com/package/cheerio", Recur);




function Recur() {

    while (atags.length <= limit && index < end) {
        if (atags[index]) {
            load_all_urls(atags[index++])
        }
        console.log(atags.length)
    }

}


function load_all_urls(url) {
    console.log(url)
    request(url, (err, res, html) => {
        if (err) {
            console.log(err)
        }
        if (!err && res.statusCode == 200) {
            const $ = cheerio.load(html)
            $('a').each((i, el) => {
                if (atags.length < limit) {
                    atags.push(($(el).attr('href')));
                    console.log($(el).attr('href'), atags.length)
                    if (atags.length == limit) {
                        fs.writeFileSync('./result.txt', atags.join("\n"), (err, res) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                        process.exit()
                    }
                }
            })
        }
    })
};
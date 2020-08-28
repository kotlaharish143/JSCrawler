const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs');


var atags = [] //This array will store all the scrapped URLs
var index = 0 //This will contain the count of Primary scrapes

function load_valid_urls(url, limit) {

    request(url, (err, res, html) => {
        if (!err && res.statusCode == 200) {
            const $ = cheerio.load(html)
            $('a').each((i, el) => {
                if (($(el).attr('href')) && atags.length < limit) {

                    if (($(el).attr('href')).includes("http", 0)) {
                        atags.push(($(el).attr('href')));

                    }
                }
            });

        }
        //if limit is reached we will write into file and exit the process 
        if (atags.length >= limit) {

            fs.writeFileSync('./result.txt', atags.join("\n"), (err, res) => {
                if (err) {
                    console.log(err);
                }
            })
            console.log("Request completed Succesfully")
            process.exit()
        }
        //If limit is not reached we will recur
        if (atags.length > 0 && atags.length < limit) {

            load_valid_urls(atags[index++], limit)
        }
    })
}
//You can change the Url and limit here
var url = "https://www.npmjs.com/package/cheerio";
var limit = 28;
load_valid_urls(url, limit);
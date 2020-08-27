const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs');

//Primary scraps - valid URLs which are directly present in Example.com
// Secondary scrapes -URLs which are present in primary scrapes

var atags = [] //This array will store all the scrapped URLs
var end = 0;   //This will contain the count of Primary scrapes
// This functions will fetch secondary scrapes using Primary scrapes which are stored in atags array
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


var index = 0   //This is the index upto the end of Primary scrapes 
//This function calls the load_all_urls using primary scrapes which are stored in atags
function Recur(limit) {

    while (atags.length <= limit && index < end) {
        if (atags[index]) {
            load_all_urls(atags[index++],limit)
        }
        
    }

}
// This function fetches the Primary scrapes from example.com
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
//You can change the Url and limit here
var url="https://www.npmjs.com/package/cheerio";
var limit = 100;
load_full_urls(url, Recur,limit);








# JSCrawler

node-crawler-cheerio
This is a project for web crawling using the nodeJs Cheerio Package.

How to install
You must have Node.JS installed to run this if you haven't
Download it here https://nodejs.org/en/
After That run
```javascript
  npm install 

```
	
This will install all the packages required for this project
```javascript
 npm start 

```

will run the source file
 some example.com is crawled and stored.each stored url will again be scraped and stored this process goes on until we reach a desired (limit) number of links 
 
 fimally the results are written into result.txt file

 You can change the limit and the example url at the function call which is at the end of index.js 

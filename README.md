# CMCscraper
Simple coin market cap scraper using cheerio.js and axios

As simple as entering (node scrap.js) in the command line.
It will create a folder called written with 2 files, one is the scraped info in json format and the other in csv format

Steps:
  1- npm install
  2- node scrap.js
  3- go to the written folder and check the files
  
To upload to an S3 bucket:
  1- go to the S3.js file and enter the file that you want to upload
  2- configure your environment variables
  3- enter the bucket name in the BUCKET_NAME variable
  4- enter node S3.js in the commandline
  
this is a quick project that i made to get my hands wet using both cheerio and AWS SDK.
  

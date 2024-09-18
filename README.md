

<h3 align="center">
Hi there 👋 <br>This is my prototype of a personal library that you can host in your pc.<br>Feel free to use it as a base and build upon it.
</h3>

<h2 align="center">
Personal Library System
</h2> 


### How to run:

## Setup PostgreSQL

Make sure you have PostgreSQL installed on your pc.
Open PostgreS terminal by entering your terminal:
```
psql -U postgres
```
Then create your database (if you are gonna be using a different name, dont forget to update your db name in config/db.js):
```
createdb library_db
```
To add your book table to your db, you can follow the steps in ```table.md``` file.


<br>


## Setup PostgreSQL
Start your service by:
```
npm i
node index.js
```


<br>


## Example CURLs
The requests are present in ```index.js``` and ```routes/books.js```. But if you need to externally test your service;
<br>
An example POST request:
```
curl -X POST http://localhost:3000/books \
>      -H "Content-Type: application/json" \
>      -d '{
>            "name": "The Great Gatsby",
>            "author": "F. Scott Fitzgerald",
>            "publish_year": 1925,
>            "finished_reading_date": "2023-08-15",
>            "cover_url": "http://example.com/gatsby.jpg"
>          }'
```
And example UPDATE request:
```
curl -X PUT http:/s/1 \lhost:3000/book 
>      -H "Content-Type: application/json" \
>      -d '{
>            "name": "The Great Gatsby (Updated)",
>            "author": "F. Scott Fitzgerald",
>            "publish_year": 1925,
>            "finished_reading_date": "2023-09-15",
>            "cover_url": "http://example.com/gatsby_updated.jpg"
>          }'

```

<br>

## Reach Out!

💬 If you have any question/feedback, please do not hesitate to reach out to me! <a href="https://www.linkedin.com/in/nisa-b%C3%BCy%C3%BCknalbant/"><img align="left" src="https://raw.githubusercontent.com/yushi1007/yushi1007/main/images/linkedin.svg" alt="Nisa | LinkedIn" width="21px"/></a>

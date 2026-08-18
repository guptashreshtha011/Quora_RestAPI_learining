# RESTful Posts API — Personal Revision Notes

> **Purpose of this project:**
> This project was created while learning **Express.js, REST APIs, RESTful routing, EJS, HTTP methods, middleware, UUIDs, and CRUD operations**.
>
> This README is written mainly for **my own revision**, so the explanations focus on *why I wrote something*, not just what the code does.

---

## 1. What is this project?

This is a simple **Posts application** built using:

* Node.js
* Express.js
* EJS
* UUID
* Method-Override
* HTML/CSS

There is **no database** in this project yet.

Instead, posts are temporarily stored inside a JavaScript array:

```js
let posts = [
    {
        id: uuidv4(),
        username: "jay",
        content: "i love coding"
    }
];
```

The project allows me to perform the basic **CRUD operations** on posts:

| Operation      | HTTP Method | Route             |
| -------------- | ----------- | ----------------- |
| View all posts | GET         | `/posts`          |
| Create a post  | POST        | `/posts`          |
| View one post  | GET         | `/posts/:id`      |
| Edit page      | GET         | `/posts/:id/edit` |
| Update post    | PATCH       | `/posts/:id`      |
| Delete post    | DELETE      | `/posts/:id`      |

This project represents my learning of **REST APIs and RESTful routing**.

---

# 2. Basic Project Structure

The project roughly looks like:

```text
project/
│
├── public/
│   └── style.css
│
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   ├── show.ejs
│   └── edit.ejs
│
├── index.js
├── package.json
└── package-lock.json
```

### `index.js`

This is the main Express server.

It contains:

* Express configuration
* Middleware
* Routes
* Posts array
* CRUD logic
* Server startup

### `views/`

Contains the EJS templates that are rendered by Express.

### `public/`

Contains static files such as CSS.

---

# 3. Starting Express

First I require Express:

```js
const express = require("express");
```

Then create an Express application:

```js
const app = express();
```

I define the port:

```js
const port = 8080;
```

Finally, the server listens on that port:

```js
app.listen(port, () => {
    console.log("listening to port: 8080");
});
```

### Remember

`app` represents my Express application.

Routes and middleware are attached to this `app`.

---

# 4. `path` Module

I use Node's built-in `path` module:

```js
const path = require("path");
```

It helps me create paths that work properly with the operating system.

For example:

```js
app.set("views", path.join(__dirname, "views"));
```

This tells Express where my EJS files are located.

---

# 5. EJS

I use EJS as my template engine:

```js
app.set("view engine", "ejs");
```

This allows Express to render `.ejs` files.

For example:

```js
res.render("index.ejs", { posts });
```

Here:

* `index.ejs` = template
* `{ posts }` = data being sent to the template

Inside EJS I can access the data:

```ejs
<%= post.content %>
```

### Important idea

Express handles the **server-side logic**.

EJS handles the **HTML rendering**.

---

# 6. Static Files

I use:

```js
app.use(express.static(path.join(__dirname, "public")));
```

This tells Express to serve files from the `public` folder.

So CSS files can be loaded by the browser.

---

# 7. URL-Encoded Middleware

I use:

```js
app.use(express.urlencoded({ extended: true }));
```

This is important when submitting HTML forms.

For example, if my form contains:

```html
<input name="username">
<textarea name="content"></textarea>
```

then after submitting the form I can access:

```js
req.body.username
req.body.content
```

Without the middleware, Express would not properly parse this form data.

---

# 8. UUID

I installed the UUID package because my posts need unique IDs.

```js
const { v4: uuidv4 } = require("uuid");
```

UUID means **Universally Unique Identifier**.

I can generate an ID using:

```js
uuidv4();
```

For example:

```text
550e8400-e29b-41d4-a716-446655440000
```

I use this when creating posts:

```js
let id = uuidv4();
```

This gives every post its own unique identifier.

---

# 9. Why do I need IDs?

Initially, I only had:

```js
{
    username: "jay",
    content: "i love coding"
}
```

But imagine there are 100 posts.

How will I tell Express:

> "I want to edit THIS particular post"?

I need some unique identifier.

So every post gets:

```js
{
    id: uuidv4(),
    username: "jay",
    content: "i love coding"
}
```

Then I can access a particular post using:

```text
/posts/:id
```

---

# 10. Temporary Database

There is currently **no database**.

I am using a JavaScript array:

```js
let posts = [
    {
        id: uuidv4(),
        username: "jay",
        content: "i love coding"
    },
    {
        id: uuidv4(),
        username: "vijay",
        content: "i am great at coding"
    },
    {
        id: uuidv4(),
        username: "ajay",
        content: "i hate coding"
    }
];
```

This is only for learning.

### Important limitation

If I restart the server, the data is reset.

A real application would store posts in a database such as:

* MongoDB
* MySQL
* PostgreSQL

---

# 11. REST API / RESTful Routing

This project is mainly about learning **RESTful routing**.

REST = **Representational State Transfer**.

The important idea I learned is:

> The URL represents the resource, while the HTTP method represents the operation I want to perform.

In my project, the resource is:

```text
/posts
```

A particular post is:

```text
/posts/:id
```

Then the HTTP method tells Express what I want to do.

### Example

```text
GET /posts
```

Means:

> Give me the posts.

```text
POST /posts
```

Means:

> Create a new post.

```text
GET /posts/abc123
```

Means:

> Give me the post whose ID is `abc123`.

```text
PATCH /posts/abc123
```

Means:

> Update the post whose ID is `abc123`.

```text
DELETE /posts/abc123
```

Means:

> Delete the post whose ID is `abc123`.

---

# 12. CRUD

This project implements CRUD.

CRUD stands for:

```text
C → Create
R → Read
U → Update
D → Delete
```

### Create

```text
POST /posts
```

### Read

```text
GET /posts
GET /posts/:id
```

### Update

```text
PATCH /posts/:id
```

### Delete

```text
DELETE /posts/:id
```

This is one of the main things I should remember from this project.

---

# 13. GET `/posts`

```js
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});
```

This route displays all posts.

### Flow

```text
Browser
   ↓
GET /posts
   ↓
Express
   ↓
posts array
   ↓
index.ejs
   ↓
HTML response
   ↓
Browser
```

The posts array is passed to EJS:

```js
{ posts }
```

Then EJS displays them.

---

# 14. GET `/posts/new`

```js
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
```

This route opens the page containing the form for creating a new post.

Important:

This route **does not create the post**.

It only displays the form.

The actual creation happens through:

```text
POST /posts
```

---

# 15. POST `/posts`

This is where the new post is actually created.

```js
app.post("/posts", (req, res) => {

    let { username, content } = req.body;

    let id = uuidv4();

    posts.push({
        id,
        username,
        content
    });

    res.redirect("/posts");
});
```

### Step-by-step

First, get data from the form:

```js
let { username, content } = req.body;
```

Generate a unique ID:

```js
let id = uuidv4();
```

Create the new post and push it into the array:

```js
posts.push({
    id,
    username,
    content
});
```

Finally:

```js
res.redirect("/posts");
```

The user is sent back to the posts page.

---

# 16. Why `res.redirect()`?

After creating a post, I don't want the user to stay on the POST request.

Instead:

```text
POST /posts
      ↓
Create post
      ↓
Redirect
      ↓
GET /posts
      ↓
Display all posts
```

This gives a clean user flow.

---

# 17. GET `/posts/:id`

This route displays one particular post.

```js
app.get("/posts/:id", (req, res) => {

    let { id } = req.params;

    let post = posts.find((p) => id === p.id);

    res.render("show.ejs", { post });
});
```

The important part is:

```js
req.params
```

If the URL is:

```text
/posts/abc123
```

then:

```js
req.params.id
```

will contain:

```text
abc123
```

I then search the array:

```js
posts.find((p) => id === p.id);
```

`find()` returns the post whose ID matches the ID from the URL.

---

# 18. `req.params` vs `req.body`

This is important.

### URL parameter

For:

```text
/posts/abc123
```

I get:

```js
req.params.id
```

### Form/request body

For data submitted through a form:

```js
req.body
```

For example:

```js
req.body.username
req.body.content
```

### Remember

```text
req.params → data from URL
req.body   → data sent inside request body
```

---

# 19. PATCH `/posts/:id`

PATCH is used to update an existing resource.

```js
app.patch("/posts/:id", (req, res) => {

    let { id } = req.params;

    let newContent = req.body.content;

    let post = posts.find((p) => id === p.id);

    post.content = newContent;

    console.log(post);

    res.redirect("/posts");
});
```

### Flow

```text
PATCH /posts/:id
       ↓
Get ID from req.params
       ↓
Get new content from req.body
       ↓
Find matching post
       ↓
Change post.content
       ↓
Redirect to /posts
```

---

# 20. Why PATCH?

I learned that HTTP methods have different purposes.

### GET

Retrieve something.

### POST

Create something.

### PUT

Replace/update a resource completely.

### PATCH

Partially update a resource.

### DELETE

Delete a resource.

In this project I use:

```text
PATCH
```

because I am changing the content of an existing post rather than recreating the entire post.

---

# 21. GET `/posts/:id/edit`

This route displays the edit form:

```js
app.get("/posts/:id/edit", (req, res) => {

    let { id } = req.params;

    let post = posts.find((p) => id === p.id);

    res.render("edit.ejs", { post });
});
```

Important distinction:

```text
GET /posts/:id/edit
```

does **not** update anything.

It only shows the edit page.

The actual update happens through:

```text
PATCH /posts/:id
```

---

# 22. Method Override

HTML forms traditionally support only:

```text
GET
POST
```

But my RESTful application also needs:

```text
PATCH
DELETE
```

Therefore I installed:

```text
method-override
```

and required it:

```js
const methodOverride = require("method-override");
```

Then:

```js
app.use(methodOverride("_method"));
```

Now an HTML form can use:

```text
?_method=PATCH
```

or:

```text
?_method=DELETE
```

---

# 23. PATCH Form

An HTML form can submit:

```html
<form action="/posts/<%= post.id %>?_method=PATCH" method="POST">
```

Although the browser sends a:

```text
POST
```

request, method-override changes it into:

```text
PATCH
```

for Express.

So:

```text
HTML Form
    ↓
POST /posts/:id?_method=PATCH
    ↓
method-override
    ↓
PATCH /posts/:id
    ↓
Express PATCH route
```

---

# 24. DELETE `/posts/:id`

The delete route:

```js
app.delete("/posts/:id", (req, res) => {

    let { id } = req.params;

    posts = posts.filter((p) => id !== p.id);

    res.redirect("/posts");
});
```

First I get the ID:

```js
let { id } = req.params;
```

Then I use `filter()`.

```js
posts = posts.filter((p) => id !== p.id);
```

This keeps every post whose ID is **not equal** to the requested ID.

Therefore the selected post is removed.

---

# 25. `find()` vs `filter()`

This is something worth remembering.

### `find()`

Used when I want to find **one matching element**.

```js
let post = posts.find((p) => id === p.id);
```

Result:

```text
one post
```

### `filter()`

Used when I want to create an array containing elements that satisfy a condition.

```js
posts = posts.filter((p) => id !== p.id);
```

Result:

```text
new posts array without the deleted post
```

---

# 26. Complete RESTful Route Table

This is the most important revision table.

| HTTP Method | Route             | Purpose               |
| ----------- | ----------------- | --------------------- |
| GET         | `/posts`          | Show all posts        |
| GET         | `/posts/new`      | Show create-post form |
| POST        | `/posts`          | Create new post       |
| GET         | `/posts/:id`      | Show one post         |
| GET         | `/posts/:id/edit` | Show edit form        |
| PATCH       | `/posts/:id`      | Update post           |
| DELETE      | `/posts/:id`      | Delete post           |

### Resource

```text
/posts
```

### Individual resource

```text
/posts/:id
```

---

# 27. Complete Request Flow

## Creating a Post

```text
GET /posts/new
       ↓
new.ejs
       ↓
User fills form
       ↓
POST /posts
       ↓
req.body
       ↓
Generate UUID
       ↓
posts.push()
       ↓
redirect("/posts")
       ↓
GET /posts
       ↓
index.ejs
```

---

## Reading a Post

```text
GET /posts/:id
       ↓
req.params.id
       ↓
posts.find()
       ↓
show.ejs
       ↓
Browser
```

---

## Updating a Post

```text
GET /posts/:id/edit
       ↓
edit.ejs
       ↓
User changes content
       ↓
POST /posts/:id?_method=PATCH
       ↓
method-override
       ↓
PATCH /posts/:id
       ↓
req.params.id
       ↓
req.body.content
       ↓
posts.find()
       ↓
post.content = newContent
       ↓
redirect("/posts")
```

---

## Deleting a Post

```text
POST /posts/:id?_method=DELETE
       ↓
method-override
       ↓
DELETE /posts/:id
       ↓
req.params.id
       ↓
posts.filter()
       ↓
Post removed
       ↓
redirect("/posts")
```

---

# 28. Important Express Concepts Learned

Through this project I learned:

### Express application

```js
const app = express();
```

### Middleware

```js
app.use(...)
```

### Routes

```js
app.get(...)
app.post(...)
app.patch(...)
app.delete(...)
```

### Request object

```js
req
```

Important properties:

```js
req.params
req.body
```

### Response object

```js
res
```

Important methods:

```js
res.render()
res.redirect()
res.send()
res.status()
```

### Template rendering

```js
res.render("index.ejs", { posts });
```

### Static files

```js
express.static()
```

---

# 29. What Makes This RESTful?

The main thing I learned is that I don't need a different URL for every action.

For example, I don't need:

```text
/createPost
/updatePost
/deletePost
/getPost
```

Instead, I use the **same resource URL** and change the HTTP method.

```text
/posts
```

and:

```text
GET     → Read
POST    → Create
```

For a particular post:

```text
/posts/:id
```

and:

```text
GET     → Read
PATCH   → Update
DELETE  → Delete
```

This is the basic idea behind **RESTful routing**.

---

# 30. Important Things I Should Remember

### 1. `req.params`

Used for URL parameters.

```js
/posts/:id
```

```js
req.params.id
```

---

### 2. `req.body`

Used for data sent inside the request body.

```js
req.body.content
```

Requires:

```js
app.use(express.urlencoded({ extended: true }));
```

for URL-encoded HTML form data.

---

### 3. `res.render()`

Used to render an EJS page.

```js
res.render("index.ejs", { posts });
```

---

### 4. `res.redirect()`

Used to redirect the browser to another route.

```js
res.redirect("/posts");
```

---

### 5. `find()`

Find one post.

```js
posts.find(...)
```

---

### 6. `filter()`

Create a new array based on a condition.

```js
posts.filter(...)
```

---

### 7. UUID

Used to generate unique post IDs.

```js
uuidv4()
```

---

### 8. Method Override

Allows HTML forms to simulate:

```text
PATCH
DELETE
```

because normal HTML forms primarily support GET and POST.

---

# 31. What I Have NOT Learned Yet

This project is intentionally simple.

Things I can add later:

* MongoDB
* Mongoose
* Database CRUD
* Authentication
* Authorization
* REST API returning JSON
* Postman/Hoppscotch API testing
* Validation
* Error-handling middleware
* MVC architecture
* Controllers
* Routers
* Environment variables
* Authentication using sessions/JWT
* API documentation

---

# 32. Next Logical Version

The natural progression of this project should be:

```text
Current Project
      ↓
Express + EJS
      ↓
Posts stored in array
      ↓
        MongoDB
      ↓
Mongoose
      ↓
MVC structure
      ↓
Express Router
      ↓
REST API returning JSON
      ↓
Authentication
      ↓
Complete backend application
```

---

# 33. One-Minute Revision

If I come back to this project after a few months, remember:

```text
Express
   ↓
Server

EJS
   ↓
HTML rendering

Middleware
   ↓
Process requests

UUID
   ↓
Unique IDs

/posts
   ↓
Resource

GET
   ↓
Read

POST
   ↓
Create

PATCH
   ↓
Update

DELETE
   ↓
Delete

req.params
   ↓
URL data

req.body
   ↓
Request body data

find()
   ↓
Find one

filter()
   ↓
Remove/filter elements

method-override
   ↓
Allow PATCH/DELETE from HTML forms

res.render()
   ↓
Render EJS

res.redirect()
   ↓
Redirect browser
```

---

# 34. What This Project Means in My Learning Journey

This project is my first practical representation of my learning of **RESTful APIs with Express.js**.

I started with a simple array of posts and then built the complete CRUD flow around it.

The important lesson is not the posts application itself.

The important lesson is understanding:

```text
Client
  ↓
HTTP Request
  ↓
Express Route
  ↓
req.params / req.body
  ↓
Application Logic
  ↓
Data
  ↓
HTTP Response
  ↓
Client
```

Once I understand this flow properly, moving from an array to a real database and from EJS pages to a frontend such as React becomes much easier.

---

## Final Revision Question

When revising this project, I should be able to answer these without looking at the code:

1. What is REST?
2. What makes a route RESTful?
3. Difference between GET, POST, PATCH and DELETE?
4. Difference between `req.params` and `req.body`?
5. Why do I need UUID?
6. Why am I using `method-override`?
7. Difference between `find()` and `filter()`?
8. What does `res.render()` do?
9. What does `res.redirect()` do?
10. Why is `/posts/:id` better than creating separate URLs like `/editPost`, `/deletePost`, etc.?
11. How does a POST form eventually reach my Express route?
12. What happens when I submit the PATCH/DELETE form?
13. Why does my data disappear when the server restarts?
14. How would I replace the `posts` array with MongoDB?

**If I can explain all 14 questions without looking at the code, I understand this project rather than just having copied it.**
#   Q u o r a _ R e s t A P I _ l e a r i n i n g  
 
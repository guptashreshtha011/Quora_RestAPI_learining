//package.json is added express is added ejs is added 

//requiring express and adding port 
const express = require("express");
const app = express();
const port = 8080;
//path for ejs and css/html template
const path = require("path");

//requiring uuid version 4 will find on npm website
const { v4 : uuidv4 } = require('uuid');
// this is a function that creates unique id
// we will just add this inside every post id
// uuidv4();

//this require  method-override package that is installed for override html method
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//decoder 
app.use(express.urlencoded({extended: true}));

//for ejs file creation inside views folder
app.set("view engine" , "ejs");

//joining path for views folder
app.set("views" , path.join(__dirname , "views"));

//joining path for css folder name public
app.use(express.static(path.join(__dirname,"public")));

//crreating an array that stores the posts as no database available
//now the challenge arrives and here when we add new post we cannot assign id to it and hence cannot see it in detail to  overcome that we need to assign id's too
// for that we use UUID package  available on npm
let posts = [
    {
        id : uuidv4(),
        username : "jay" ,
        content : "i love coading"
    },
    {
        id : uuidv4(),
        username : "vijay" ,
        content : "i am great at coading"
    },
    {
        id : uuidv4(),
        username : "ajay" ,
        content : "i hate coading"
    },
];

//creating new api  /post to view post on the website
app.get("/posts", (req , res) => {
    res.render("index.ejs", {  posts });
    //it send posts data to index.ejs
});

// creating new api /posts/new that  help create new post
app.get("/posts/new" , (req,res) => {
    res.render("new.ejs");
    // it sends user to new.ejs page
});

//  since the post is created we creat a post method to post the new post on the /posts path
app.post("/posts" , (req,res)=> {
    //as we know post req is in body not url so save data in the below variable
    let {username , content} = req.body;
    //since we are creating a new post we will also create a id for it
    let id = uuidv4();
    // this add the newely created post saved in the above variable inside posts array as push is one of that array method  
    posts.push({id ,username , content});
    // here the post creation is a whole new page that is /posts/new to link both we use res.redirect(url) this is a response method that hellp redirect
    res.redirect("/posts");
    //something new nott in notes
});

//we are creating a new path here that would  help us fetch any post with it's unique id if we had a database then it already had a unique if for stuff but we currently not
// here we are using find function of that array and creating a fun inside that that would compare id entetred to id inside array and return the matched one
app.get("/posts/:id" , (req , res) =>{
    //it takes data from the url and save in id
    let {id} = req.params;
    //here we got the post annd saved it inside post variable and to display it to user we render it and for render we create show.ejs
    let post = posts.find((p) => id === p.id);
    //it is a code that  is recomended by gpt to add as if an id doesn't exise it won't go un defined
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs" , {post});
    //it sends post data to show.ejs page
});

//now since the baics operation are  done let's just say a user want to update it's post so we will create a patch route for that
app.patch("/posts/:id" , (req , res) =>{
    //it is used to save id inside id that came in request
    let {id} = req.params;
    //it save the parameter we sent through patch request through hoppscotch/ postman in urlcncoded from in body 
    let newContent = req.body.content;
    // finding our post through id
    let post = posts.find((p) => id === p.id);
    //it changes the previous post content to the new content we send through postman patch request
    post.content = newContent ;
    //prints the post into terminal that is inside response body
    console.log(post);
    //it redirects to the main page that has routh /posts
    res.redirect("/posts");

});

// since we do not want to use hoppscotch/ postman everytime we will create an edit route too
app.get("/posts/:id/edit" , (req , res) => {
    // it takes id from the url request
    let {id} = req.params;
    //it find the posts through id 
    let post = posts.find((p) => id === p.id);
    // it send the  post data to edit.ejs file  
    res.render("edit.ejs" , {post});
});
// now we are defining a delete route 
app.delete("/posts/:id", (req,res) =>{
    // it takes id from the url request
    let {id} = req.params;
    //it filter all the id that doesnot match the requested id and again save them in the posts array
    posts = posts.filter((p) => id !== p.id);
    //it  redirects to the main page
    res.redirect("/posts");    
});


//nodemon is listening
app.listen(port , ()=>{
console.log("listening to port: 8080");
});


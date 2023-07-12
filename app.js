//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//const Blogs = [];


mongoose.connect("mongodb+srv://Gautam_Sodhi:Noobcoder888@cluster0.obpadln.mongodb.net/blogDB?retryWrites=true&w=majority");
const blogSchema=new mongoose.Schema({
  title: String,
  body: String,
})
const Blog= mongoose.model('blog',blogSchema);

app.get("/", function (req, res) {
  // res.render("home", {
  //   homeContent: homeStartingContent,
  //   Blogs: Blogs,
  // });

  Blog.find({}).then(function(blog){
    res.render("home", {homeContent: homeStartingContent, Blogs: blog});
  })

})


app.get("/contact", function (req, res) {
  res.render("contact", { Ccontent: contactContent });
});
app.get("/about", function (req, res) {
  res.render("about", { Acontent: aboutContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
})


app.get("/posts/:id", function (req, res) {
  // Blogs.forEach(function (blog) {
  //   if (_.lowerCase(blog.title) === _.lowerCase(req.params.id)) {
  //     res.render("post", { Title: blog.title, body: blog.PostBody });
  //   }
  //   else {
  //     console.log("Match not found");
  //   }
  // })
  
  Blog.findOne({_id:req.params.id}).then(function(blog){
     res.render("post",{Title: blog.title, body: blog.body});
  }).catch(function(err){
    console.log(err);
  })
});
app.post("/compose", function (req, res) {
   // const input = {
  //   title: req.body.composeTitle,
  //   PostBody: req.body.postBody
  // };
  // Blogs.push(input);
  // res.redirect("/");

  const Title = _.capitalize(req.body.composeTitle);
  const bodyContent=req.body.postBody;
  const input = new Blog(
  {  title: Title,
    body: bodyContent,}
  );
  
  input.save().then(function(){
    res.redirect("/");
  }).catch(function(err){
    console.log(err);
  });


})
app.listen(3000, function () {
  console.log("Server started on port 3000");
});

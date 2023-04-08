# social-media-post-plena

# Introduction

asset-management is a Express App (MongoDB, Express.JS, Graphql, and Node.JS) based web application made by Dinesh Bhadane as assignment to Plena Finance.

# Prerequisite for developing

Download and Install Node.JS LTS: https://nodejs.org/en/download/

If you're running Ubuntu, download Node.JS using the terminal command: sudo apt install nodejs

# Development
1. Download and Install VS Code: https://code.visualstudio.com/
2. Clone this respository to your local machine
3. Use .env for environment variable for database connection
4. Open up terminal, go to the server/ folder, and run npm install
5. Run npm install nodemon --save-dev to install a dependency we will need for testing
6. Now, go back to the server/ folder, and run nodemon server in terminal .
7. Use altair graphql UI to test graphql APIs


Definition

Make a service which creates different posts. only required technology is express.js you can choose everything else.
post consists of an image (jpg, png, jpeg types only), title, description and tags. tags are case insensitive and we need to have a tag counter. 
so for example we should be able to see how many posts are there with specific tags.
post requirements:
all fields are required except tags. 
the title should be unique, min length 3 max 20
description min length 10 max 3000

features:
fetch posts. // order create date desc
fetch specific post by title
search posts by title (case insensitive search), tags, user and in between specific dates (not all fields are required but we should be able to filter with all of them if user provides)
create post
update post
delete post by ids

few considerations:
when we are creating a post we should have a jwt token in header. from jwt token we should read user's username
when deleting or updating posts we should check if it's a valid user to delete or update a post

when fetching the post we should also get the username who created a post and create date

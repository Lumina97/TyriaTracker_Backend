import {Router} from "express";

const Authentication = Router();

//Create new user Endpoint
Authentication.post("/auth/users", (req,res)  => {

})

//Update User
Authentication.patch("/auth/users:email", (req,res)  => {
    
})


//Delete User
Authentication.post("/auth/users:email", (req,res)  => {
    
})

//Get User
Authentication.get("/auth/users:email", (req,res)  => {
    
})

//logIn User
Authentication.post("/auth/login:email/:password", (req,res)  => {
    
})

//logOut User
Authentication.post("/auth/logout", (req,res)  => {
    
})

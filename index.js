import express from 'express';

const app = express();

const port = 4000;

// we are going to create a server which will be able to handle the crud requests on the server 
app.use(express.json());
let arr = [];
let id = 0;


app.get('/',(req , res)=>{
    res.send('Siddharth and his company waving a hii to you all !!!!!!!!!')
})
app.get('/about',(req,res)=>{
    res.send('This is the about page of my website!!!!');
})

app.post('/add',(req,res)=>{
    const username  = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const user = {
        id : id++,
        username: username,
        email: email,
        password: password
    
    };
    arr.push(user);
    res.status(200).json({
        message: 'User added successfully',
        User : user
    });
})

app.get('/add/:id',(req,res)=>{
    const user = arr.find(t => t.id === parseInt(req.params.id));
    if(!user)
    {
        res.send('404 User Not Found');
        return;
    }
    res.status(200).json({
        message : 'User found Successfully',
        User : user
    });
})

// to get all the users 

app.get('/all',(req,res)=>{
    if(arr.length === 0)
    {
        res.status(200).json({
            message : 'No Users Found',
            Users : []
        })
    }else{
        res.status(200).json({
            message : 'Users Data are',
            Users : arr
        });
    }
})
// update the user data 
app.put('/update/:id',(req,res)=>{
    const user = arr.find(t => t.id === parseInt(req.params.id));
    if(!user)
    {
        req.send('404 User Not Found');
        return;
    }
    /* const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password; */
    const { username, email , password } = req.body;
    user.username = username ;
    user.email = email;
    user.password = password;

    res.status(200).json({
        message : 'User updated Successfully',
        User : user
    });
})

// delete the user data by its id

/* app.delete('/delete/:id',(req,res)=>{
    const user = arr.find(t => t.id === parseInt(req.params.id));
    if(user === -1)
    {
        res.send('404 User Not Found');
        return;
    }else{
        arr = arr.filter(t => t.id !== parseInt(req.params.id));
        res.status(200).json({
            message : 'User Deleted SuccessFully',
            User : user
        });
    }
}); */

app.delete('/delete/:id',(req,res)=>{
    const Index = arr.findIndex(t=> t.id === parseInt(req.params.id));

    if(Index === -1)
    {
        return res.status(404).json({
            message : '404 User Not Found'
        });
    }

    arr.splice(Index,1);
    return res.status(204).send("deleted successfully");
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
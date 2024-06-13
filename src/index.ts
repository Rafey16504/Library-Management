const express = require('express');
const bodyParser = require('body-parser');
import { bookRouter } from './library_management';
const app = express();
const port = 3000;
const collections: any[] = []; // Define type according to your data structure

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/library',  bookRouter);

// Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// Adding new collections
// app.post('/collections', (req,res) => {           
//     const body = req.body;
//     collection = false
//     for(i=0;i<collections.length;i++){
//         if(collections[i].name === body.name){
//             collection = true
//             break
//         }
//     }
//     if(!collection)
//         {
//             collections.push(body)
//             return res.send({collections})
//         }
//         else
//             return res.send("Collection Already exists")
//     })

// // Updating the description of collection_name
// app.post('/:collection_name',(req,res)=>{            
      
//     const collection_name = req.params.collection_name;
//     console.log(req.params.id)
//     if(collection_name)
//     {
//         const collection = collections.find((collection) => collection.name === collection_name)
//         if(!collection)
//             return res.send({error: "No collection found!"})
//         collection.description = "Accessories"
//         return res.send(collections)
//     }
//     return res.send("Error")
// })

// // Looking for a collection name
// app.get(`/:collection_name`, (req, res) => {
//   const collection_name = req.params.collection_name;
//   if(collection_name)
//     {
//         const collection = collections.find((collection) => collection.name === collection_name)
//         if(!collection)
//             return res.send({error: "No collection found!"})
//         return res.send(collection)
//     }
//     return res.send({error: "No collection name."})
// });

// // Deleting a colletion_name
// app.delete(`/:collection_name`, (req,res)=> {
//     const collection_name = req.params.collection_name;
//     if(collection_name)
//     {
//         const collection = collections.find((collection) => collection.name === collection_name)
//         if(!collection)
//             return res.send({error: "No collection found!"})
//         const index = collections.findIndex(item => item.name === collection.name)
//         collections.splice(index, 1);
//         return res.send(collections)
//     }
//     return res.send({error: "No collection name."})  
// })



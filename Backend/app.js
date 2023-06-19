const cookieParser =require("cookie-parser")
const express = require('express');
const app=express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require("./routes/User-Routes");
const adminRouter = require("./routes/Admin-Routes");

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(cookieParser());
// app.use("/user", userRouter);
// app.use("/admin", adminRouter);

// Enable pre-flight CORS request handling
app.options('*', cors());

app.use("/", userRouter);
app.use("/admin", adminRouter);

// mongoose.connect('mongodb+srv://admin:CfVhU9ypzIwU0ZZ2@cluster0.uersqux.mongodb.net')
mongoose.connect('mongodb+srv://bijusubith:VgtXFzkTwK38O302@cluster0.oahejxi.mongodb.net/usermanage1?retryWrites=true&w=majority')
// mongoose.connect('mongodb+srv://admin:t8HhOrnPvpfO1Yp4@cluster0.uersqux.mongodb.net/usermanage?retryWrites=true&w=majority')

app.listen(5000,()=>
{console.log('server running.... on port 5000')
});









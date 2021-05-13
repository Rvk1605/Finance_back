const { response } = require('express');
const express =require('express');
const port =8080;
const path=require('path');
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('asset'));

var customers_list=[{
    first:'Rajveer',
    last:'Kumar',
    email:'rk2279709@gmail.com',
    phone:'9304121798'
    },
    {
    first:'Rahul',
    last:'Behra',
    email:'1906348@kiit.ac.in',
    phone:'987543210'
    }
]

var transaction_list = []

app.get('/',function(request,response){
    response.render('index',{});
});

//Customers&Transaction

app.get('/customer',function(request,response){
    response.render('customers',{
        customer:customers_list,
        transaction:transaction_list
    });
});


//Customer
app.post('/create-customer',function(request,response){
    customers_list.push(request.body);
    response.redirect('back');

});

app.get('/delete-customer/',function(request,response){
    console.log(request.query);
    let phone=request.query.phone;
    let customerIndex=customers_list.findIndex(customers_list=>
        customers_list.phone==phone);

    if(customerIndex!=-1){
        customers_list.splice(customerIndex,1);
    }
    response.redirect('back');
});

//Transaction

app.post('/create-transaction',function(request,response){
    console.log(request.body)
    transaction_list.push(request.body);
    response.redirect('back');

});

app.get('/delete-transaction/',function(request,response){
    console.log(request.query);
    let accountno=request.query.accountno;
    let transactionIndex=transaction_list.findIndex(transaction_list=>
        transaction_list.accountno==accountno);

    if(transactionIndex!=-1){
        transaction_list.splice(transactionIndex,1);
    }
    response.redirect('back');
});


app.listen(process.env.PORT||8080,function(err){
    if(err){
        console.log(err);
        return response.send("Error :404 Not Found");
    }
    console.log("Server is Up and Running on Port :",port);
});


import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import patient from "./models/patient.js"
import publicKeys from "./models/public.js"
import researchKeys from "./models/research.js"
import clinicKeys from "./models/clinic.js"
import privateKeys from "./models/private.js"
import CryptoJS from 'crypto-js'
import AES from "crypto-js/aes.js"


// App Config
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
const connection_url = "mongodb+srv://patients:EyRZsUjk3hcWFRdY@cluster0.zp4ah.mongodb.net/patientsdb?retryWrites=true&w=majority";
try{
    mongoose.connect(connection_url, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
    });
    console.log("MongoDB Connected");
}catch (err){
    console.error(err.message);
    process.exit(1);
}

// API End Points
app.get("/", (req,res) => res.status(200).send('Server Running'));


var encrypted;
var bytes;
var originalText;
var secretPassPhrasePublic = "publicsecret";
var publicsecretPassKey = "publichere";

app.post("/publickey",(req,res)=>{
    const publickeydetails = req.body;
    encrypted = CryptoJS.AES.encrypt(req.body['keyencrypted'], publicsecretPassKey).toString();
    req.body['keyencrypted'] = encrypted
    publicKeys.create(publickeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            console.log(data)
            res.status(201).send(data)
        }
    })
});

var usingkeyspublic;
app.get("/publickey", (req,res) =>{
    var key1, key2;
    const publickeydetails = req.body;    
    publicKeys.find(publickeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            
            key1 = data[0]['keyencrypted']
            key2 = data[0]['todecrypt']
            bytes = CryptoJS.AES.decrypt(key1, key2);
            originalText = bytes.toString(CryptoJS.enc.Utf8);
            key1 = originalText
            res.status(201).send(data)
            
        }
    })
});


var secretPassPhraseResearch = "researchsecret";
var researchsecretPassKey = "researchhere";

app.post("/researchkey",(req,res)=>{
    const researchkeydetails = req.body;
    encrypted = CryptoJS.AES.encrypt(req.body['keyencrypted'], researchsecretPassKey).toString();
    req.body['keyencrypted'] = encrypted
    researchKeys.create(researchkeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            console.log(data)
            res.status(201).send(data)
        }
    })
});

var usingkeyspublic;
app.get("/researchkey", (req,res) =>{
    var key1, key2;
    const researchkeydetails = req.body;    
    researchKeys.find(researchkeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            
            key1 = data[0]['keyencrypted']
            key2 = data[0]['todecrypt']
            bytes = CryptoJS.AES.decrypt(key1, key2);
            originalText = bytes.toString(CryptoJS.enc.Utf8);
            key1 = originalText
            res.status(201).send(data)
            
        }
    })
});

var secretPassPhraseClinic = "clinicsecret";
var clinicsecretPassKey = "clinichere";

app.post("/clinickey",(req,res)=>{
    const clinickeydetails = req.body;
    encrypted = CryptoJS.AES.encrypt(req.body['keyencrypted'], clinicsecretPassKey).toString();
    req.body['keyencrypted'] = encrypted
    clinicKeys.create(clinickeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            console.log(data)
            res.status(201).send(data)
        }
    })
});

var usingkeyspublic;
app.get("/clinickey", (req,res) =>{
    var key1, key2;
    const clinickeydetails = req.body;    
    clinicKeys.find(clinickeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            
            key1 = data[0]['keyencrypted']
            key2 = data[0]['todecrypt']
            bytes = CryptoJS.AES.decrypt(key1, key2);
            originalText = bytes.toString(CryptoJS.enc.Utf8);
            key1 = originalText
            res.status(201).send(data)
            
        }
    })
});


var secretPassPhrasePrivate = "privatesecret";
var privatesecretPassKey = "privatehere";

app.post("/privatekey",(req,res)=>{
    const privatekeydetails = req.body;
    encrypted = CryptoJS.AES.encrypt(req.body['keyencrypted'], privatesecretPassKey).toString();
    req.body['keyencrypted'] = encrypted
    privateKeys.create(privatekeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            console.log(data)
            res.status(201).send(data)
        }
    })
});

var usingkeyspublic;
app.get("/privatekey", (req,res) =>{
    var key1, key2;
    const privatekeydetails = req.body;    
    privateKeys.find(privatekeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            
            key1 = data[0]['keyencrypted']
            key2 = data[0]['todecrypt']
            bytes = CryptoJS.AES.decrypt(key1, key2);
            originalText = bytes.toString(CryptoJS.enc.Utf8);
            key1 = originalText
            res.status(201).send(data)
            
        }
    })
});


app.post("/privatedetails", (req,res) =>{
    const dbPatientDetails = req.body;
    //public
    encrypted = CryptoJS.AES.encrypt(req.body['disease'], publicsecretPassKey).toString();
    req.body['disease'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['age'], publicsecretPassKey).toString();
    req.body['age'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['treatmentid'], publicsecretPassKey).toString();
    req.body['treatmentid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['insuranceplanid'], publicsecretPassKey).toString();
    req.body['insuranceplanid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['name'], publicsecretPassKey).toString();
    req.body['name'] = encrypted
    //research
    encrypted = CryptoJS.AES.encrypt(req.body['age'], researchsecretPassKey).toString();
    req.body['age'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['treatmentid'], researchsecretPassKey).toString();
    req.body['treatmentid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['insuranceplanid'], researchsecretPassKey).toString();
    req.body['insuranceplanid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['name'], researchsecretPassKey).toString();
    req.body['name'] = encrypted
    //clinic
    encrypted = CryptoJS.AES.encrypt(req.body['treatmentid'], clinicsecretPassKey).toString();
    req.body['treatmentid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['insuranceplanid'], clinicsecretPassKey).toString();
    req.body['insuranceplanid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['name'], clinicsecretPassKey).toString();
    req.body['name'] = encrypted
    //private
    encrypted = CryptoJS.AES.encrypt(req.body['insuranceplanid'], privatesecretPassKey).toString();
    req.body['insuranceplanid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['name'], privatesecretPassKey).toString();
    req.body['name'] = encrypted

    var secretPassPhrase;
    patient.create(dbPatientDetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});

app.get("/privatedetails", (req,res) =>{
    const dbPatientDetails = req.body;
    patient.find(dbPatientDetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});



// Listener
app.listen(port, () => { console.log(`App listening on port ${port}`);});



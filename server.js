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
var fetchedPublicKey;
var todecryptkey;
app.get("/publickey", (req,res) =>{
    var key1, key2;
    const publickeydetails = req.body;    
    publicKeys.find(publickeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            
            key1 = data[0]['keyencrypted']
            key2 = data[0]['todecrypt']
            console.log(key1)
            bytes = CryptoJS.AES.decrypt(key1, key2);
            originalText = bytes.toString(CryptoJS.enc.Utf8);
            console.log(originalText)
            fetchedPublicKey = originalText.toString();
            todecryptkey = key2
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
var fetchedResearchKey;
var todecryptresearchkey;
app.get("/researchkey", (req,res) =>{
    
    var key1, key2;
    const researchkeydetails = req.body;    
    researchKeys.find(researchkeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            
            key1 = data[0]['keyencrypted']
            key2 = data[0]['todecrypt']
            console.log(key1)
            bytes = CryptoJS.AES.decrypt(key1, key2);
            originalText = bytes.toString(CryptoJS.enc.Utf8);
            fetchedResearchKey = originalText.toString();
            todecryptresearchkey = key2
            console.log(originalText)
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

var fetchedClinicKey;
var todecryptclinickey;
app.get("/clinickey", (req,res) =>{
    var key1, key2;
    const clinickeydetails = req.body;    
    clinicKeys.find(clinickeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            key1 = data[0]['keyencrypted']
            key2 = data[0]['todecrypt']
            console.log(key1)
            bytes = CryptoJS.AES.decrypt(key1, key2);
            originalText = bytes.toString(CryptoJS.enc.Utf8);            
            fetchedClinicKey = originalText.toString();
            todecryptclinickey = key2
            console.log(originalText)
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

var fetchedPrivateKey;
var todecryptprivatekey;
app.get("/privatekey", (req,res) =>{
    var key1, key2;
    const privatekeydetails = req.body;    
    privateKeys.find(privatekeydetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            
            key1 = data[0]['keyencrypted']
            key2 = data[0]['todecrypt']
            console.log(key1)
            bytes = CryptoJS.AES.decrypt(key1, key2);
            originalText = bytes.toString(CryptoJS.enc.Utf8);
            fetchedPrivateKey = originalText.toString();
            todecryptprivatekey = key2
            console.log(originalText)
            res.status(201).send(data)
            
        }
    })
});


app.post("/privatedetails", (req,res) =>{
    const dbPatientDetails = req.body;
    //public
    encrypted = CryptoJS.AES.encrypt(req.body['disease'], secretPassPhrasePublic).toString();
    req.body['disease'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['averagerecoverytime'], secretPassPhrasePublic).toString();
    req.body['averagerecoverytime'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['age'], secretPassPhrasePublic).toString();
    req.body['age'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['treatmentid'], secretPassPhrasePublic).toString();
    req.body['treatmentid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['insuranceplanid'], secretPassPhrasePublic).toString();
    req.body['insuranceplanid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['name'], secretPassPhrasePublic).toString();
    req.body['name'] = encrypted
    //research
    encrypted = CryptoJS.AES.encrypt(req.body['age'], secretPassPhraseResearch).toString();
    req.body['age'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['treatmentid'], secretPassPhraseResearch).toString();
    req.body['treatmentid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['insuranceplanid'], secretPassPhraseResearch).toString();
    req.body['insuranceplanid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['name'], secretPassPhraseResearch).toString();
    req.body['name'] = encrypted
    //clinic
    encrypted = CryptoJS.AES.encrypt(req.body['treatmentid'], secretPassPhraseClinic).toString();
    req.body['treatmentid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['insuranceplanid'], secretPassPhraseClinic).toString();
    req.body['insuranceplanid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['name'], secretPassPhraseClinic).toString();
    req.body['name'] = encrypted
    // //private
    encrypted = CryptoJS.AES.encrypt(req.body['insuranceplanid'], secretPassPhrasePrivate).toString();
    req.body['insuranceplanid'] = encrypted
    encrypted = CryptoJS.AES.encrypt(req.body['name'], secretPassPhrasePrivate).toString();
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

var publicList = {};
app.get("/publicdetails", (req,res) =>{
    var todecryptdisease;
    var bytespublicdetails, convertedoriginaltext;
    const dbPublicPatientDetails = req.body;
    patient.find(dbPublicPatientDetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            var lengthofdata = data.length;
            for(var i = 0;i<lengthofdata;i++){
                publicList[i] = {}
                if(fetchedPublicKey != undefined){
                    todecryptdisease = data[i]['disease'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    publicList[i]['disease'] = convertedoriginaltext
                    todecryptdisease = data[i]['averagerecoverytime'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    publicList[i]['averagerecoverytime'] = convertedoriginaltext
                    
                }
                else{
                    publicList[i]['disease'] = data[i]['disease'].toString();
                    publicList[i]['averagerecoverytime'] = data[i]['averagerecoverytime'].toString();
            
                }
                
            }
            res.status(201).send(publicList)
        }
    })
}
)


var researchList = {};
app.get("/researchdetails", (req,res) =>{
    var todecryptdisease;
    var bytespublicdetails, convertedoriginaltext;
    const dbResearchPatientDetails = req.body;
    patient.find(dbResearchPatientDetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            var lengthofdata = data.length;
            console.log(lengthofdata)
            for(var i = 0;i<lengthofdata;i++){
                researchList[i] = {}
                //age
                if(fetchedResearchKey != undefined && fetchedPublicKey != undefined){
                    //researchkey
                    
                    todecryptdisease = data[i]['age'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedResearchKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //publickey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    researchList[i]['age'] = convertedoriginaltext
                }else{
                    
                    researchList[i]['age'] = data[i]['age'].toString();
                }
                if(fetchedPublicKey != undefined){
                //disease
                    todecryptdisease = data[i]['disease'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    researchList[i]['disease'] = convertedoriginaltext
                    //averagerecoverytime
                    todecryptdisease = data[i]['averagerecoverytime'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    researchList[i]['averagerecoverytime'] = convertedoriginaltext
                }
                else{
                    researchList[i]['disease'] = data[i]['disease'].toString();
                    researchList[i]['averagerecoverytime'] = data[i]['averagerecoverytime'].toString();
                }
                
            }
            res.status(201).send(researchList)
        }
    })
}
)

var clinicList = {};
app.get("/clinicdetails", (req,res) =>{
    var todecryptdisease;
    var bytespublicdetails, convertedoriginaltext;
    const dbClinicPatientDetails = req.body;
    patient.find(dbClinicPatientDetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            var lengthofdata = data.length;
            console.log(lengthofdata)
            for(var i = 0;i<lengthofdata;i++){
                clinicList[i] = {}
                //treatmentid
                if(fetchedClinicKey!= undefined &&  fetchedResearchKey != undefined && fetchedPublicKey != undefined){
                    //clinickey
                    todecryptdisease = data[i]['treatmentid'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedClinicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //researchkey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedResearchKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //publickey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    clinicList[i]['treatmentid'] = convertedoriginaltext
                }else{
                    clinicList[i]['treatmentid'] = data[i]['treatmentid'].toString();
                }
                
                //age
                if(fetchedResearchKey != undefined && fetchedPublicKey != undefined){
                    //researchkey
                    todecryptdisease = data[i]['age'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedResearchKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //publickey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    clinicList[i]['age'] = convertedoriginaltext
                }else{
                    
                    clinicList[i]['age'] = data[i]['age'].toString();
                }
                if(fetchedPublicKey != undefined){
                //disease
                    todecryptdisease = data[i]['disease'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    clinicList[i]['disease'] = convertedoriginaltext
                    //averagerecoverytime
                    todecryptdisease = data[i]['averagerecoverytime'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    clinicList[i]['averagerecoverytime'] = convertedoriginaltext
                }
                else{
                    clinicList[i]['disease'] = data[i]['disease'].toString();
                    clinicList[i]['averagerecoverytime'] = data[i]['averagerecoverytime'].toString();
                }
                
            }
            res.status(201).send(clinicList)
        }
    })
}
)


var privateList = {};
app.get("/privatedetailshospital", (req,res) =>{
    var todecryptdisease;
    var bytespublicdetails, convertedoriginaltext;
    const dbPrivatePatientDetails = req.body;
    patient.find(dbPrivatePatientDetails,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            var lengthofdata = data.length;
            console.log(lengthofdata)
            for(var i = 0;i<lengthofdata;i++){
                privateList[i] = {}
                if(fetchedPrivateKey != undefined && fetchedClinicKey != undefined && fetchedResearchKey != undefined && fetchedPublicKey != undefined){
                    //name
                    //privatekey
                    todecryptdisease = data[i]['name'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPrivateKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //clinickey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedClinicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //researchkey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedResearchKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //publickey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    privateList[i]['name'] = convertedoriginaltext;
                    //insuranceplanid
                    //privatekey
                    todecryptdisease = data[i]['insuranceplanid'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPrivateKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //clinickey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedClinicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //researchkey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedResearchKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //publickey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    privateList[i]['insuranceplanid'] = convertedoriginaltext;
                }else{
                    privateList[i]['name'] = data[i]['name'].toString();
                    privateList[i]['insuranceplanid'] = data[i]['insuranceplanid'].toString();
                }
                if(fetchedClinicKey!= undefined &&  fetchedResearchKey != undefined && fetchedPublicKey != undefined){
                    //clinickey
                    todecryptdisease = data[i]['treatmentid'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedClinicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //researchkey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedResearchKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //publickey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    privateList[i]['treatmentid'] = convertedoriginaltext
                }else{
                    privateList[i]['treatmentid'] = data[i]['treatmentid'].toString();
                }

                //age
                if(fetchedResearchKey != undefined && fetchedPublicKey != undefined){
                    //researchkey
                    todecryptdisease = data[i]['age'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedResearchKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    //publickey
                    todecryptdisease = convertedoriginaltext;
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    privateList[i]['age'] = convertedoriginaltext
                }else{
                    
                    privateList[i]['age'] = data[i]['age'].toString();
                }
                if(fetchedPublicKey != undefined){
                    //disease
                    todecryptdisease = data[i]['disease'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    privateList[i]['disease'] = convertedoriginaltext
                    //averagerecoverytime
                    todecryptdisease = data[i]['averagerecoverytime'];
                    bytespublicdetails = CryptoJS.AES.decrypt(todecryptdisease, fetchedPublicKey);
                    convertedoriginaltext = bytespublicdetails.toString(CryptoJS.enc.Utf8);
                    privateList[i]['averagerecoverytime'] = convertedoriginaltext
                }
                else{
                    privateList[i]['disease'] = data[i]['disease'].toString();
                    privateList[i]['averagerecoverytime'] = data[i]['averagerecoverytime'].toString();
                }
                
            }
            res.status(201).send(privateList)
        }
    })
}
)





// Listener
app.listen(port, () => { console.log(`App listening on port ${port}`);});



var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var passport=require('passport');
var LocalStrategy=require('passport-local');
var methodOverride=require('method-override');
var async = require('async');


var User=require('./models/user.js');
var Certification=require('./models/certification.js');
var Language=require('./models/language.js');
var Project=require('./models/project.js');
var SoftSkill=require('./models/softSkill.js');
var Software=require('./models/software.js');
var TechnicalSkill=require('./models/technicalSkill.js');
var UserProfile=require('./models/userProfile.js');
var Work=require('./models/work.js');
var College=require('./models/college.js');
const { db } = require('./models/user.js');



var idn=1;


//seedDB();

mongoose.connect('mongodb+srv://team:team@cluster0.c7rqj.mongodb.net/<dbname>?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.set('view engine','ejs');

app.use(require('express-session')({
    secret:"secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride('_method'));

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});



User.find({},function(err,users){
    idn=idn+users.length;
    console.log(idn);
})

app.get("/", function(req,res){
    res.render('home');
});

app.get("/profile", isLoggedIn, function(req,res){
    res.render('profile');
});

app.get("/login", function(req,res){
    res.render('login');
});

app.get("/register", function(req,res){
    res.render('register');
});

app.post("/register", function(req,res){
    var newUser=new User({username:req.body.username, id : idn++});

  User.register(newUser,req.body.password,function(err,user){
      if(err){
        return res.redirect('/register');
      }
      
        passport.authenticate('local')(req,res,function(){
            res.redirect('/userProfile');
        });
      
           
  });
});


app.post('/login',passport.authenticate('local',
{
    successRedirect:'/resume',
    failureRedirect: '/login'
}),
function(req,res){
    
});


app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
})




app.get('/userProfile', isLoggedIn, function(req,res){
    res.render('userProfile');
})


app.get('/certification', isLoggedIn, function(req,res){
    res.render('certification');
})

app.get('/language', isLoggedIn, function(req,res){
    res.render('language');
})

app.get('/project', isLoggedIn, function(req,res){
    res.render('project');
})

app.get('/softSkill', isLoggedIn, function(req,res){
    res.render('softSkill');
})

app.get('/software', isLoggedIn, function(req,res){
    res.render('software');
})

app.get('/technicalSkill', isLoggedIn, function(req,res){
    res.render('technicalSkill');
})

app.get('/work', isLoggedIn, function(req,res){
    res.render('work');
})

app.get('/college', isLoggedIn, function(req,res){
    res.render('college');
})


app.post('/userProfile', isLoggedIn, function(req,res){
    var newProfile= { UserId : req.user.id, Username : req.user.username, Name : req.body.Name, Email : req.body.Email,No : req.body.No,Address : req.body.Address,ResumeSummary : req.body.ResumeSummary};
    UserProfile.create( newProfile,function(err,UserProfile){
            if(err){
                console.log(err)
            }
            else{
                console.log(UserProfile);
                res.redirect('/resume');
            }
        }
    );
})


app.post('/work', isLoggedIn, function(req,res){
    var newWork= { UserId : req.user.id, Designation : req.body.Designation,Company : req.body.Company,WorkId : req.body.WorkId,Duration : req.body.Duration, Experience: req.body.Experience};
    Work.create( newWork,function(err,Work){
            if(err){
                console.log(err)
            }
            else{
                console.log(Work);
                res.redirect('/resume');
            }
        }
    );
})


app.post('/college', isLoggedIn, function(req,res){
    var newCollege = { UserId : req.user.id, Title : req.body.Title,CollegeName : req.body.CollegeName,CollegeId : req.body.CollegeId,GraduationYear : req.body.GraduationYear,Percentage : req.body.Percentage};
    College.create( newCollege,function(err,College){
            if(err){
                console.log(err)
            }
            else{
                console.log(College);
                res.redirect('/resume');
            }
        }
    );
})

app.post('/project', isLoggedIn, function(req,res){
    var newProject= { UserId : req.user.id, ProjectName : req.body.ProjectName,ProjectDescription : req.body.ProjectDescription};
    Project.create( newProject,function(err,Project){
            if(err){
                console.log(err)
            }
            else{
                console.log(Project);
                res.redirect('/resume');
            }
        }
    );
})


app.post('/technicalSkill', isLoggedIn, function(req,res){
    var newTechnicalSkill= { UserId : req.user.id, TechnicalSkill : req.body.TechnicalSkill};
    TechnicalSkill.create( newTechnicalSkill,function(err,TechnicalSkill){
            if(err){
                console.log(err)
            }
            else{
                console.log(TechnicalSkill);
                res.redirect('/resume');
            }
        }
    );
})

app.post('/softSkill', isLoggedIn, function(req,res){
    var newSoftSkill= { UserId : req.user.id, SoftSkill : req.body.SoftSkill};
    SoftSkill.create( newSoftSkill,function(err,SoftSkill){
            if(err){
                console.log(err)
            }
            else{
                console.log(SoftSkill);
                res.redirect('/resume');
            }
        }
    );
})

app.post('/certification', isLoggedIn, function(req,res){
    var newCertification= { UserId : req.user.id, Certification : req.body.certification};
    Certification.create( newCertification,function(err,certification){
            if(err){
                console.log(err)
            }
            else{
                console.log(certification);
                res.redirect('/resume');
            }
        }
    );
})

app.post('/software', isLoggedIn, function(req,res){
    var newSoftware= { UserId : req.user.id, Software : req.body.software};
    Software.create( newSoftware,function(err,software){
            if(err){
                console.log(err)
            }
            else{
                console.log(software);
                res.redirect('/resume');
            }
        }
    );
})


app.post('/language', isLoggedIn, function(req,res){
    var newLanguage= { UserId : req.user.id, Language : req.body.language};
    Language.create( newLanguage,function(err,language){
            if(err){
                console.log(err)
            }
            else{
                console.log(language);
                res.redirect('/resume');
            }
        }
    );
})




   






/* ====================================================================================*/

app.get('/resume',isLoggedIn, function(req,res){

var allRefDatasSchemas = {
    UserProfile : UserProfile,
    Language : Language,
    Software : Software,
    Certification : Certification,
    Project : Project,
    SoftSkill : SoftSkill,
    TechnicalSkill : TechnicalSkill,
    College : College,
    Work : Work
};

/*
 * need an array to run all queries one by one in a definite order!
 */
var arr = [];
for(each in allRefDatasSchemas) {
	arr.push(each);
}

/*
 * Callback function for initiation of waterfall
 */
var queue = [
	function(callback) {
		// pass the ref array and run first query by passing starting index - 0
		callback(null, arr, 0)
	}
];

/*
 * Object to store result of all queries
 */
var finalResult = {};

/*
 * Generic Callback function for every dynamic query
 */
var callbackFunc = function(prevModelData, currentIndex, callback) {
	allRefDatasSchemas[arr[currentIndex]].find({UserId : req.user.id}, function(err, result) {
		if(err) {
			console.log(err)
		} else {
			// console.log(result)
			finalResult[arr[currentIndex]] = result
			callback(null, result, currentIndex + 1)
		}
	})
}

/*
 * Add callback function for every dynamic query
 */
for(each in allRefDatasSchemas) {
	queue.push(callbackFunc);
}

/*
 * Run all dynamic queries one by one using async.js waterfall method
 */
async.waterfall(queue, function (err, result) {
    console.log('finish', finalResult)
    res.render('resume', {result : finalResult});
});


});




/* ====================================================================================*/

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())  
        return next();
    res.redirect('/login');
}


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running");
})
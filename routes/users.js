const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//login
router.get("/login", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("login");
});

//register page
router.get("/register", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("register");
});

//Register handle
router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    if (errors) {
        res.render('register', {
            errors,
            email,
            password
        });
    } else {
        // validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //user exists
                    errors.push({ msg: 'Email is already registered!' });
                    res.render('register', {
                        errors,
                        email,
                        password
                    });
                } else {
                    const newUser = new User({
                        name: name,
                        email,
                        password,
                        pincode

                    });

                    //hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //Set password to hash
                            newUser.password = hash;
                            //Save user
                            newUser.save()
                                .then(user => {
                                    res.redirect('/index');
                                })
                                .catch(err => console.log(err));
                        }))
                    console.log(newUser);
                    res.send('hello');
                }
            });
        res.send('pass');
    }

});

//Login handle
router.post("/register", (req, res) => {
    const { email, password } = req.body;
    if (errors) {
        res.render('register', {
            errors,
            email,
            password
        });
    } else {
        // validation passed
        User.findOne({ email: email })
            .then(user => {

                if (user) {
                    //user exists
                    res.render('register', {
                        errors,
                        email,
                        password
                    });
                }
            });
        res.send('pass');
    }
});

/*router.get("/", (req,res)=>{
// return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
res.render("index");
});*/

module.exports = router;
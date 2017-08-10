const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const redis = require('../services/redis');

router.get('/api/users/me', (req, res) => {

    res.send(req.user || { name: 'Anonymous', job: 'Unknown' });
    
});

router.post('/api/users/login', (req, res) => {

    console.log('body', req.body);

    const userName = req.body.name;
    const password = req.body.password;

    const key = 'user:' + userName + ':passwordHash';
    console.log('getting', key);

    redis.get(key)
        .then(passwordHash => {
            if (password && passwordHash && bcrypt.compareSync(password, passwordHash)) {
                var crypto = require("crypto");
                const sessionToken = crypto.randomBytes(20).toString('hex');
                redis.set('sessionToken:' + sessionToken, userName);
                res.cookie('session_token', sessionToken);
                return res.sendStatus(200);
            }

            res.sendStatus(403);
        });

});

module.exports = router;

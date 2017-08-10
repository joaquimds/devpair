const bcrypt = require('bcrypt-nodejs');
const redis = require('./redis');

module.exports = {
    ensure: () => {
        return Promise.all([
            redis.set('user:Joaquim:name', 'Joaquim'),
            redis.set('user:Joaquim:passwordHash', bcrypt.hashSync('password')),
            redis.set('user:Joaquim:job', 'Employee at Outlandish')
        ]);
    }
};

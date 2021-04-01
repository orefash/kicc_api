
const crypto = require('crypto');

module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("member", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fname: {
            type: Sequelize.STRING
        },
        mname: {
            type: Sequelize.STRING
        },
        lname: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        branchId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'branches',
                key: 'id'
            }
        },
        givingNo: {
            type: Sequelize.STRING
            // ,
            // unique: true
        },
        title: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            get() {
                return () => this.getDataValue('password')
            }
        },
        salt: {
            type: Sequelize.STRING,
            get() {
                return() => this.getDataValue('salt')
            }
        },
        age: {
            type: Sequelize.STRING
        },
        sex: {
            type: Sequelize.STRING
        },
        bday: {
            type: Sequelize.DATE
        },
        street: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone1: {
            type: Sequelize.STRING
        },
        phone2: {
            type: Sequelize.STRING
        },
        marital_status: {
            type: Sequelize.STRING
        },
        m_anniversary: {
            type: Sequelize.DATE
        },
        occupation: {
            type: Sequelize.STRING
        },
        employer: {
            type: Sequelize.STRING
        },
        church_bg: {
            type: Sequelize.STRING
        },
        baptized: {
            type: Sequelize.BOOLEAN
        }
    });

    Member.generateSalt = function() {
        return crypto.randomBytes(16).toString('base64')
    }
    Member.encryptPassword = function(plainText, salt) {
        return crypto
            .createHash('RSA-SHA256')
            .update(plainText)
            .update(salt)
            .digest('hex')
    }

    

    const setSaltAndPassword = user => {
        // console.log("In update check: ", user)
        if (user.changed('password')) {
            
            // console.log("In update check - pass changed")
            user.salt = Member.generateSalt()
            user.password = Member.encryptPassword(user.password(), user.salt())
        }
    }

    
    const updateSaltAndPassword = user => {
        console.log("In update check: ", user)
        if (user.password) {
            
            console.log("In update check - pass changed")
            user.salt = Member.generateSalt()
            user.password = Member.encryptPassword(user.password(), user.salt())
        }
    }

    
    Member.beforeCreate(setSaltAndPassword)
    Member.beforeUpdate(updateSaltAndPassword)

    
    Member.prototype.correctPassword = function(enteredPassword) {
        // console.log("In password check")
        return Member.encryptPassword(enteredPassword, this.salt()) === this.password()
    }
  
    return Member;
};
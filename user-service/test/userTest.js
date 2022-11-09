import chai, { use } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../model/user-model.js';
import {dummyData} from '../data/userData.js';
import {app} from '../index.js';
import jwt from "jsonwebtoken";

import {
    STATUS_CODE_SUCCESS,
    STATUS_CODE_BAD_REQUEST,
    STATUS_CODE_CREATED,
    SECRET_TOKEN,
} from '../common/constants.js';
import { 
    PREFIX_USER_SVC,
    API_LOGIN,
} from '../common/config.js';


const assert = chai.assert;

// Configure chai
chai.use(chaiHttp)
chai.should()

before(async function () {
  await UserModel.deleteMany();
})

describe("createUser", () => {
  let userId = null;
  
  it ('should create a new user successfully', (done) => {
    chai.request(app)
      .post(`${PREFIX_USER_SVC}/`)
      .send(dummyData[0])
      .end((err, res) => {
        res.should.have.status(STATUS_CODE_CREATED)
        res.body.message.should.equal(`Created new user ${dummyData[0].username} successfully!`)
      
        UserModel.findOne({ username : dummyData[0].username}, (err, user) => {
          user.should.have.property('id').that.is.a('string')
          user.should.have.property('username').that.is.a('string')
          user.should.have.property('password').that.is.a('string')
          userId = user._id
          done()
        })
      }).timeout(10000);
  })

  it ('should fail to create a new user if password is missing', (done) => {
    chai.request(app)
      .post(`${PREFIX_USER_SVC}/`)
      .send(dummyData[5])
      .end((err, res) => {
        res.should.have.status(STATUS_CODE_BAD_REQUEST)
        res.body.message.should.equal('Username and/or Password are missing!')
        done()
      }).timeout(10000);
  })

  it ('should fail to create a new user if user already exists', (done) => {
    chai.request(app)
      .post(`${PREFIX_USER_SVC}/`)
      .send(dummyData[0])
      .end((err, res) => {
        res.should.have.status(STATUS_CODE_BAD_REQUEST)
        res.body.message.should.equal('Username is already used!')
        done()
      }).timeout(10000);
  })

  after(() => {
    UserModel.findByIdAndDelete(userId)
  })

});

describe('Login and Auth', function() {

    before((done) => {
      chai.request(app)
      .post(`${PREFIX_USER_SVC}/`)
      .send(dummyData[2])
      .end((err, res) => {
        done()
      })
    });

    it('should be able to succesfully login and have correct token', function(done) {
        chai.request(app)
          .post(API_LOGIN)
          .send(dummyData[2])
          .end((error, result) => {
            result.should.have.status(STATUS_CODE_SUCCESS);
            result.should.not.have.status(STATUS_CODE_BAD_REQUEST);
            result.body.should.have.property('username');
            result.body.should.have.property('token');
            result.body.username.should.equal(dummyData[2].username);
            let testToken = result.body.token;
            //below checks the validation of the token
            const tokenData = jwt.verify(testToken, SECRET_TOKEN);
  
            UserModel.findById(tokenData.userId, (err, user) => {
              user.should.have.property('username').that.is.equal(dummyData[2].username);
            });
            done();
        });
    }).timeout(10000);
});

describe('Fail Login wrong password', function() {
    it('should be able to not login and show correct error msg', function(done) {
        chai.request(app)
          .post(API_LOGIN)
          .send(dummyData[3])
          .end((error, result) => {
            result.should.have.status(STATUS_CODE_BAD_REQUEST);
            result.should.not.have.status(STATUS_CODE_SUCCESS);
            result.body.message.should.equal('Invalid credentials.');
            done();
        });
    }).timeout(10000);

    it('detects that the user does not exist in the database', function(done) {
        chai.request(app)
          .post(API_LOGIN)
          .send(dummyData[4])
          .end((error, result) => {
            result.should.have.status(STATUS_CODE_BAD_REQUEST);
            result.should.not.have.status(STATUS_CODE_SUCCESS);
            result.body.message.should.equal("User does not exist in database.");
            done();
        });
    }).timeout(10000);

    it('detects one of the fields is missing', function(done) {
        chai.request(app)
          .post(API_LOGIN)
          .send(dummyData[5])
          .end((error, result) => {
            result.should.have.status(STATUS_CODE_BAD_REQUEST);
            result.should.not.have.status(STATUS_CODE_SUCCESS);
            result.body.message.should.equal("Missing Fields");
            done();
        });
    }).timeout(10000);
});


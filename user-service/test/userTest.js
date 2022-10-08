import chai from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../model/user-model.js';
import {dummyData} from '../data/userData.js';
import {app} from '../index.js';
import jwt from "jsonwebtoken"
import { authentication } from '../middleware/authentication.js';
import {
    STATUS_CODE_SUCCESS,
    STATUS_CODE_BAD_REQUEST,
    STATUS_CODE_CREATED,
    SECRET_TOKEN,
} from '../common/constants.js';
import { 
    PREFIX_USER_SVC,
    URL_LOGIN,
    URL_DELETE_USER,
    URL_CHANGE_PASSWORD, 
} from '../common/config.js';


const assert = chai.assert;

// Configure chai
chai.use(chaiHttp)
chai.should()

describe("createUser", () => {
    describe('POST', () => {

    })   
})
let globaltoken;

describe('Login and Auth', function() {
    it('should be able to succesfully login and have correct token', function(done) {
        chai.request(app)
          .post('/api/user/login')
          .send(dummyData[2])
          .end((error, result) => {
            result.should.have.status(STATUS_CODE_SUCCESS);
            result.should.not.have.status(STATUS_CODE_BAD_REQUEST);
            result.body.should.have.property('username');
            result.body.should.have.property('token');
            result.body.username.should.equal(dummyData[2].username);
            let testToken = result.body.token;
            //below checks the validation of the token
            let compareId= '63307f00734e63efc0a62f1c';
            const tokenData = jwt.verify(testToken, SECRET_TOKEN);
            let tokeStr = tokenData.userId.toString();
            globaltoken = tokeStr;
            tokeStr.should.equal(compareId);
            done();
        });
    }).timeout(10000);
  });

  describe('Fail Login wrong password', function() {
    it('should be able to not lolgin and show correct error msg', function(done) {
        chai.request(app)
          .post('/api/user/login')
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
          .post('/api/user/login')
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
          .post('/api/user/login')
          .send(dummyData[5])
          .end((error, result) => {
            result.should.have.status(STATUS_CODE_BAD_REQUEST);
            result.should.not.have.status(STATUS_CODE_SUCCESS);
            result.body.message.should.equal("Missing Fields");
            done();
        });
    }).timeout(10000);
  });
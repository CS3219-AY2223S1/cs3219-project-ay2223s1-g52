import { ormCreateUser as _createUser, ormUserExists as _userExists, ormUpdatePassword as _updatePassword, ormDeleteUser as _deleteUser } from '../model/user-orm.js'
import { SALT_ROUNDS, STATUS_CODE_CREATED, STATUS_CODE_SUCCESS, STATUS_CODE_BAD_REQUEST, STATUS_CODE_SERVER_ERROR } from "../common/constants.js";
import bcrypt from 'bcrypt';
export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        const userExists = await _userExists(username);
        if (username && password && !userExists) {

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const resp = await _createUser(username, hashedPassword);

            if (resp.err) {
                console.log("Failed to create a new user!");
                return res.status(STATUS_CODE_BAD_REQUEST).json({message: 'Could not create a new user!'});
            } else {
                console.log(`Created new user ${username} successfully!`)
                return res.status(STATUS_CODE_CREATED).json({message: `Created new user ${username} successfully!`});
            }
        } else if (!username || !password) {
            console.log("Username and/or Password are missing!")
            return res.status(STATUS_CODE_BAD_REQUEST).json({message: 'Username and/or Password are missing!'});
        } else if (userExists) {
            console.log("Username exists. Cannot create account")
            return res.status(STATUS_CODE_BAD_REQUEST).json({message: 'Username is already used!'})
        } else {
            return res.status(STATUS_CODE_BAD_REQUEST).json({message: 'System failed to create new user!'})
        }
    } catch (err) {
        return res.status(STATUS_CODE_SERVER_ERROR).json({message: 'Database failure when creating new user!'})
    }
}

export async function changePassword(req, res) {
    try {
        const { password } = req.body;
        const userId = req.userId;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const resp = await _updatePassword(userId, hashedPassword);

        if (resp.err) {
            console.log("Failed to update password!");
            return res.status(STATUS_CODE_BAD_REQUEST).json({message: 'Could not update password!'});
        } else {
            console.log(`Changed ${userId}'s password successfully!`);
            return res.status(STATUS_CODE_SUCCESS).json({message: 'Password changed successfully!'});
        }

    } catch (err) {
        console.log(err);
        return res.status(STATUS_CODE_SERVER_ERROR).json({message: 'Server errror, failed to change password!'});
    }
}

export async function deleteUser(req, res) {
    try {
        const userId  = req.userId;
        const resp = await _deleteUser(userId);
        
        if (resp.err) {
            console.log("Failed to delete user!");
            return res.status(STATUS_CODE_BAD_REQUEST).json({message: 'Could not delete user!'});
        } else {
            console.log(`${userId} has been deleted`);
            return res.status(STATUS_CODE_SUCCESS).json({message: 'User deleted successfully!'});
        }
    } catch (err) {
        return res.status(STATUS_CODE_SERVER_ERROR).json({message: 'Database failure when deleting user!'});
    }
}

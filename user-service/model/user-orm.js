import { createUser, userExists, updatePassword, deleteUser, getUser } from './repository.js';
//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const newUser = await createUser({username, password});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

export async function ormUserExists(username) {
    try {
        const exists = await userExists({username});
        return exists;
    } catch (err) {
        console.log('ERROR: Could not check if user exists');
        return { err };
    }
}

export async function ormUpdatePassword(userId, password) {
    try {
        const result = await updatePassword(userId, password);
        return result;
    } catch (err) {
        console.log('ERROR: Could not update password');
        return { err };
    }
}

export async function ormDeleteUser(userId) {
    try {
        const user = await deleteUser(userId);
        return user;
    } catch (err) {
        console.log('ERROR: Could not delete user');
        return { err };
    }
}

export async function ormGetUser(username) {
    try {
        const user = await getUser({ username : username});
        return user;
    } catch (err) {
        console.log('ERROR: Could not find user');
        return { err };
    }
}

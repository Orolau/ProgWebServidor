const { app, server } = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { encrypt } = require('../utils/handlePassword.js')
const { tokenSign } = require('../utils/handleJwt.js');
const {userModel} = require('../models/index.js')

const initialUsesrs = [
    {
        name: "Marcos",
        age: 23,
        email: "marcos@correo",
        password: "mipassword"
    }
]

let token
beforeAll(async () => {
    await new Promise((resolve) => mongoose.connection.once('connected', resolve));
    await userModel.deleteMany({})
    const password = await encrypt(initialUsesrs[0].password)
    const body = initialUsesrs[0]
    body.password = password
    const userData = await userModel.create(body)
    userData.set("password", undefined, { strict: false })
    token = await tokenSign(userData, process.env.JWT_SECRET)
    console.log(token)
});

const api = supertest(app);
it('should get all users', async () => {
    const response = await api.get('/api/user')
        .auth(token, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    console.log(response.body)
    expect(response.body.data.length).toBe(1)
});

afterAll(async () => {
    server.close()
    await mongoose.connection.close()
});
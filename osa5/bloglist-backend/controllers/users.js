const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        if (body.password.length < 3 || !body.password) {
            response.status(400).json({ error: 'password is too short or it does not exist' })
        } else if (body.username.length < 3 || !body.username) {
            response.status(400).json({ error: 'username is too short or it does not exist' })
        } else {

            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash,
            })

            const savedUser = await user.save()

            response.json(savedUser.toJSON())
        }
    } catch (exception) {
        next(exception)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { likes: 0, user: 0 })
    response.json(users.map(u => u.toJSON()))
})

usersRouter.delete('/:id', async (request, response, next) => {
    try {
        await User.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch(error) {
        next(error)
    }
})

module.exports = usersRouter
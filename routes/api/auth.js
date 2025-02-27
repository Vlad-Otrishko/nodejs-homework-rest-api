const express = require('express')
const { BadRequest, Conflict, Unauthorized } = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../../models')
const { joiSchema } = require('../../models/user')

const router = express.Router()
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { sendEmail } = require('../../helpers')

const { SECRET_KEY, SITE_NAME } = process.env

router.post('/signup', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('User already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const verificationToken = nanoid()
    const avatarURL = gravatar.url(email)
    const newUser = await User.create({
      email,
      password: hashPassword,
      verificationToken,
      avatarURL,
    })
    const data = {
      to: email,
      subject: 'email confirmation',
      html: `<a target="_blank" href="${SITE_NAME}/users/verify/${verificationToken}">please, confirm your email</a>`,
    }
    await sendEmail(data)
    res.status(201).json({
      user: {
        email: newUser.email,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new Unauthorized('Email or password is wrong')
    }
    if (!user.verify) {
      throw new Unauthorized('Email is not verified')
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      throw new Unauthorized('Email or password is wrong')
    }

    const { _id, subscription } = user
    const payload = {
      id: _id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    await User.findByIdAndUpdate(_id, { token })
    res.json({
      token,
      user: {
        email,
        subscription,
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

export const BASE_URL = 'http://localhost:5000'

export const REGISTER = `${BASE_URL}/user/register`
export const LOGIN = `${BASE_URL}/user/login`
export const LOGOUT = `${BASE_URL}/user/logout`
export const LOGINUSER = `${BASE_URL}/user/profile`
export const ALLUSERS = `${BASE_URL}/users`
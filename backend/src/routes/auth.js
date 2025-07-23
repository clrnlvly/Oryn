import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const cleanEmail = email?.trim();
  const cleanPassword = password?.trim();
  const envEmail = process.env.ADMIN_EMAIL?.trim();
  const envPassword = process.env.ADMIN_PASSWORD?.trim();

  console.log("REQ:", cleanEmail, cleanPassword);
  console.log("ENV:", envEmail, envPassword);

  if (cleanEmail !== envEmail || cleanPassword !== envPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: cleanEmail }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});


export default router;

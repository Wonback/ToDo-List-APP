import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { apodo, email, password } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      res.status(400).json({ mensaje: 'El usuario ya existe' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Usuario.create({ apodo, email, password: hashedPassword });

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
      return;
    }

    const contraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!contraseñaValida) {
      res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      return;
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET!, {
      expiresIn: '2h',
    });

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

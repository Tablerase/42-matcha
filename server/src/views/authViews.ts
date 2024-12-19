import { Request, Response } from "express";
import { User } from "@interfaces/userInterface";
import { user as userModel } from "@models/userModel";
import { auth, auth as authModel } from "@models/authModel";
import { createAccessToken, createRefreshToken } from "@utils/jwt";
import { validatePassword } from "@utils/bcrypt";

const setRefreshTokenCookie = async (user: Partial<User>, req: Request) => {
  const refreshToken = createRefreshToken(user);
  await authModel.createRefreshToken({ id: user.id, token: refreshToken });
  req.res?.cookie("authToken", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 100,
    expires: new Date(Date.now() + 60 * 60 * 24 * 100),
  });
};

export const authenticateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.body;

    const { username, password } = user;

    const isUserExist = await userModel.getUserByUsername(username);

    if (!isUserExist) {
      res.status(401).json({
        status: 401,
        message: "Invalid User or password",
      });
      return;
    }

    const isPasswordMatched = await validatePassword(
      password,
      isUserExist.password
    );
    if (!isPasswordMatched) {
      res.status(401).json({
        status: 401,
        message: "Invalid User or password",
      });
      return;
    }

    const token = createAccessToken({
      id: isUserExist.id,
      email: isUserExist.email,
    });
    await setRefreshTokenCookie(
      { id: isUserExist.id, email: isUserExist.email },
      req
    );
    res.status(200).json({
      status: 200,
      message: "Login success",
      token: token,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

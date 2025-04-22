import { RequestHandler } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateCookie } from "../utils/generateCookie";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email";

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { fullname, email, password, contact } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode();

    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

     generateCookie(res, user);
    await sendVerificationEmail(email, verificationToken);
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      userWithoutPassword,
    });
  } catch (error) {
    
    
    next(error);
  }
};
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }
    generateCookie(res, user);

    user.lastLogin = new Date();
    const savedUser = await user.save();
    const { password: _, ...userWithoutpassword } = savedUser.toObject();
    res.status(200).json({
      success: true,
      message: `Welcome back ${savedUser.fullname}`,
      userWithoutpassword,
    });
  } catch (error) {
    next(error);
  }
};
export const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const { verificationCode } = req.body;
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
      return;
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    //send welcome email
    await sendWelcomeEmail(user.email, user.fullname);
    res.status(200).json({
      success: true,
      message: "Email verified Succesfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const logout: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: "Loggedout Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const forgotPassword: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Inavlid Email ",
      });
      return;
    }
    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    (user.resetPasswordToken = resetToken),
      (user.resetPasswordTokenExpiresAt = resetTokenExpiresAt);
    await user.save();

    //sendemail
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link is sent to your email",
    });
  } catch (error) {
    next(error);
  }
};
export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.params;
    
    
    const { newpassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    (user.resetPasswordToken = undefined),
      (user.resetPasswordTokenExpiresAt = undefined);
    await user.save();

    //send success reset email
    await sendResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password reset Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const checkAuth: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.id;
 

    if (!userId) {
      res.status(404).json({
        success: false,
        message: "Inavlid userId",
      });
      return;
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    next(error);
  }
};
export const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.id;
    const { fullname, email, address, city, country, profilePicture } =
      req.body;
    let cloudResponse: any;
    if(profilePicture){
      cloudResponse = await cloudinary.uploader.upload(profilePicture);
    }

   
    const updatedData:any = {
      fullname,
      email,
      address,
      city,
      country,
     // profilePicture,
    };
    if (cloudResponse) {
      updatedData.profilePicture = cloudResponse.secure_url;
    }
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");
    res.status(200).json({
      success: true,
      user,
      message: "Profile Updated Successfully",
    });

   
  } catch (error) {
    next(error);
  }
};

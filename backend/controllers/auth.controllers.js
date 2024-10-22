import bcryptjs from "bcryptjs"; // Import bcryptjs for password hashing
import crypto from "crypto"; // Import crypto for generating secure tokens
import { GoogleGenerativeAI } from "@google/generative-ai";


import { User } from "../models/user.model.js"; // Import the User model
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; // Utility to generate token and set cookie
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessfulEmail } from "../mailtrap/emails.js"; // Import all necessary email functions

// Signup controller for creating a new user
export const signup = async (req, res) => {
    const { email, password, name } = req.body; // Extract email, password, and name from request body

    try {
        // Validate if all required fields are provided
        if (!email || !name || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if a user with the given email already exists
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        // Hash the user's password for security
        const hashPassword = await bcryptjs.hash(password, 10);

        // Generate a random verification token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Create a new user instance
        const user = new User({
            email,
            password: hashPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token expires in 24 hours
        });

        // Save the user to the database
        await user.save();

        // Generate JWT token and set it in a cookie
        generateTokenAndSetCookie(res, user._id);

        // Send verification email to the user
        await sendVerificationEmail(user.email, verificationToken);

        // Respond with success and return the user object (without password)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined, // Exclude the password from the response
            },
        });

    } catch (error) {
        console.error("Error in signup:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: "Server error during signup" });
    }
};

// Email verification controller
export const verifyEmail = async (req, res) => {
    const { code } = req.body; // Extract the verification code from the request body

    try {
        // Find the user with the matching verification token and check if it's still valid
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() } // Token should be valid (not expired)
        });

        // If user not found or token expired
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        // Mark the user as verified and remove the verification token
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        // Save the changes to the database
        await user.save();

        // Send a welcome email to the user
        await sendWelcomeEmail(user.email, user.name);

        // Respond with success and return the user object (without password)
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined, // Exclude the password from the response
            }
        });

    } catch (error) {
        console.error("Error in verifyEmail:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: "Server error during email verification" });
    }
};

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    try {
        // Validate if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Log the user details (excluding password) for debugging
        console.log("User found:", { ...user._doc, password: undefined });

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate a token and set it in the cookie
        generateTokenAndSetCookie(res, user._id);

        // Update the last login date
        user.lastLogin = new Date();
        await user.save();

        // Respond with success and return the user object (without password)
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.error("Error in login:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: "Server error during login" });
    }
};

// Logout controller
export const logout = async (req, res) => {
    try {
        // Clear the token cookie to log the user out
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: "An error occurred during logout" });
    }
};

// Forgot password controller
export const forgotPassword = async (req, res) => {
    const { email } = req.body; // Extract email from request body

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Generate a secure reset token
        const resetToken = crypto.randomBytes(20).toString("hex"); // Generate a random hex string token
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // Token expires in 1 hour

        // Update the user's password reset token and expiration time
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        // Save the updated user details
        await user.save();

        // Send the password reset email with the reset link
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });

    } catch (error) {
        console.error("Error in forgotPassword:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: error.message });
    }
};

// Reset password controller
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params; // Extract reset token from URL parameters
        const { password } = req.body; // Extract new password from request body

        // Find the user with the matching reset token and check if it's still valid
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }, // Ensure token is not expired
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        // Hash the new password
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword; // Set the new hashed password
        user.resetPasswordToken = undefined; // Clear the reset token
        user.resetPasswordExpiresAt = undefined; // Clear the token expiration

        // Save the updated user details
        await user.save();

        // Send a password reset success email
        await sendResetSuccessfulEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.error("Error in resetPassword:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: "Server error during password reset" });
    }
};

// Check if the user is authenticated
export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Get treatment controller
export const getTreatment = async (req, res) => {
    const { symptom } = req.body; // Extract symptom from request body
    const userId = req.userId;

    if (!symptom) {
        return res.status(400).json({ success: false, message: "Symptom is required" });
    }

    try {
        const p1 = "In 3-4 lines without any bold letter or points, what should I do immediately after ";
        const r1 = p1.concat(symptom);
        
        // Generate treatment suggestion for immediate action
        const result1 = await model.generateContent(r1);
        const immediateAction = result1.response.text();

        const p2 = "In 3-4 lines without any bold letter or points , what are the major symptoms I should look for after ";
        const r2 = p2.concat(symptom);
        
        // Generate treatment suggestion for symptoms to look for
        const result2 = await model.generateContent(r2);
        const majorSymptoms = result2.response.text();

        const p3 = "In 3-4 lines without any bold letter or points, how can I relieve the pain when ";
        const r3 = p3.concat(symptom);
        
        // Generate pain relief suggestions
        const result3 = await model.generateContent(r3);
        const painRelief = result3.response.text();

        const p4 = "In 3-4 lines without any bold letter or points, when should I seek medical help after ";
        const r4 = p4.concat(symptom);
        
        // Generate medical attention advice
        const result4 = await model.generateContent(r4);
        const medicalAttention = result4.response.text();

          // Find the user by userId and update their symptomPrompts array
        const user = await User.findById(userId);
        if (user) {
            user.symptomPrompts.push(symptom); // Add the current symptom to the array
            await user.save(); // Save the updated user document
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Return the AI-generated treatment responses
        res.status(200).json({
            success: true,
            data: {
                immediateAction,
                majorSymptoms,
                painRelief,
                medicalAttention
            }
        });

    } catch (error) {
        console.error("Error in getTreatment:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: "Server error during treatment generation" });
    }
};
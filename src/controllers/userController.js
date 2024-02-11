const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const path = require('path');


function generateUniqueToken() {
    return uuid.v4();
}

function sendPasswordResetEmail(email, resetToken) {
    // Create a nodemailer transporter using your email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abdulwahab0156@gmail.com',
            pass: 'wqwv dcvb qtfa rlul',
        },
    });

    // Define the email options
    const mailOptions = {
        from: 'AWG International',
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: http://localhost:3000/api/users/reset-password?token=${resetToken}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending password reset email:', error);
            throw error;
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
}


const UserController = {
    signup: async (req, res) => {
        try {
            const { name, email, phone, username, password } = req.body;

           // console.log("Received data:", { name, email, phone, username, password });

            // Check if the username is already taken
            const existingUser = await UserModel.getByUsername(username);
            if (existingUser) {
                return res.status(400).json({ error: 'Username is already taken' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save the user
            await UserModel.save({ name, email, phone, username, password: hashedPassword });
            console.log("User saved successfully");

            // You can add additional logic here if needed

            // Return success message if everything is fine
            return res.status(200).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    login: async (req, res) => {
        try {
            const { emailOrUsername, password } = req.body;
           // console.log('Received data:', { emailOrUsername, password });
    
            // Check if the provided value is an email or username
            const isEmail = emailOrUsername.includes('@');
            const user = isEmail
                ? await UserModel.getByEmail(emailOrUsername)
                : await UserModel.getByUsername(emailOrUsername);
    
            console.log('Retrieved user data:', user);
    
            if (!user) {
                // If user not found, send an error response
                return res.status(401).json({ error: 'Invalid credentials' });
            }
    
            // Check if the provided password matches the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);
    
            if (passwordMatch) {
                // Save user data in the session
                req.session.user = user;
    
                // Calculate expiration date (e.g., set session expiration to 1 hour from now)
                const expirationDate = new Date();
                expirationDate.setHours(expirationDate.getHours() + 1); // Set expiration to 1 hour from now
    
                console.log('req.sessionId:', req.sessionID);
                console.log('user:', user);
    
                // Ensure that req.sessionId and user.id are defined
                if (req.sessionID && user.id) {
                    // Save session data in the sessions table with the calculated expiration date
                    await UserModel.saveSessionData(user.id, req.sessionID, expirationDate);
    
                    // Send a success response with the redirect URL
                    return res.status(200).json({
                        redirectTo: '/dashboard.html',
                        user: {
                            name: user.name,
                            username: user.username,
                            email: user.email,
                        },
                    });
                } else {
                    console.error('One or more required parameters are undefined');
                    console.error('req.sessionId:', req.sessionID);
                    console.error('user:', user);
                    throw new Error('One or more required parameters are undefined');
                  
                }
            } else {
                // If password doesn't match, send an error response
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ message: 'Logout successful' });
            }
        });
    },

    changePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;

            // Check if the user is authenticated
            if (!req.session.user) {
                return res.status(401).json({ error: 'User not authenticated' });
            }

            // Retrieve user data from the session
            const { id, password: storedPassword } = req.session.user;

            // Check if the old password matches the stored password
            const passwordMatch = await bcrypt.compare(oldPassword, storedPassword);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid old password' });
            }

            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password in the database
            await UserModel.updatePassword(id, hashedNewPassword);

            // Return success message
            return res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            // Check if the email is valid
            // Perform any additional validation if needed

            // Generate a unique token (you can use libraries like crypto or uuid)
            const resetToken = generateUniqueToken();

            // Store the token and email in the database (create a new table or add columns to the existing one)
            await UserModel.saveResetToken(email, resetToken);

            // Send a password reset link to the user's email
            sendPasswordResetEmail(email, resetToken);

            return res.status(200).json({ message: 'Password reset link sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { email, newPassword, confirmPassword } = req.body;
            const resetToken = req.query.token;
    
            // Validate the reset token
            const isValidToken = await UserModel.validateResetToken(email, resetToken);
            if (!isValidToken) {
                return res.status(400).json({ error: 'Invalid or expired reset token' });
            }
    
            // Check if passwords match
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ error: 'Passwords do not match' });
            }
    
            // Update the user's password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            await UserModel.updatePasswordByEmail(email, hashedNewPassword);
    
            // Invalidate the reset token
            await UserModel.invalidateResetToken(email);
    
            return res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
    
    renderResetPasswordPage: (req, res) => {
        const filePath = path.join(__dirname, '../../public/reset-password.html');
        res.sendFile(filePath);
    },
    
};


module.exports = UserController;

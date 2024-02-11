const db = require('./db');

const UserModel = {
    save: async (user) => {
        const { name, email, phone, username, password } = user;
        const connection = await db.getConnection();

        try {
            await connection.execute(
                'INSERT INTO users (name, email, phone, username, password) VALUES (?, ?, ?, ?, ?)',
                [name, email, phone, username, password]
            );
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        } finally {
            connection.release();
        }
    },

    getByUsername: async (username) => {
        try {
            if (typeof username !== 'string') {
                throw new Error('Username is not a valid string');
            }

            const connection = await db.getConnection();
            const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error getting user by username:', error);
            throw error;
        }
    },

    getByEmail: async (email) => {
        try {
            if (typeof email !== 'string') {
                throw new Error('Email is not a valid string');
            }

            const connection = await db.getConnection();
            const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error getting user by email:', error);
            throw error;
        }
    },

    saveSessionData: async (userId, sessionId, expirationDate) => {
        try {
            if (userId === undefined || sessionId === undefined || expirationDate === undefined) {
                throw new Error('One or more required parameters are undefined');
            }

            const connection = await db.getConnection();
            
            try {
                await connection.execute(
                    'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
                    [userId, sessionId, expirationDate]
                );
            } catch (insertError) {
                if (insertError.code === 'ER_DUP_ENTRY') {
                    await connection.execute(
                        'UPDATE sessions SET expires_at = ? WHERE user_id = ? AND token = ?',
                        [expirationDate, userId, sessionId]
                    );
                } else {
                    throw insertError;
                }
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error saving session data:', error);
            throw error;
        }
    },

    updatePassword: async (userId, newPassword) => {
        const connection = await db.getConnection();

        try {
            await connection.execute(
                'UPDATE users SET password = ? WHERE id = ?',
                [newPassword, userId]
            );
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        } finally {
            connection.release();
        }
    },

    saveResetToken: async (email, resetToken, expirationDate) => {
        const connection = await db.getConnection();
    
        try {
            // Ensure that parameters are not undefined
            const token = resetToken || null;
            const expires = expirationDate || null;
    
            await connection.execute(
                'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?',
                [token, expires, email]
            );
        } catch (error) {
            console.error('Error saving reset token:', error);
            throw error;
        } finally {
            connection.release();
        }
    },
    
    validateResetToken: async (emailFromRequest, resetToken) => {
        const connection = await db.getConnection();
    
        try {
            if (!emailFromRequest || typeof emailFromRequest !== 'string') {
                console.log('Invalid email:', emailFromRequest);
                return false;
            }
    
            const [userRows] = await connection.execute('SELECT * FROM users WHERE email = ?', [emailFromRequest]);
    
            if (userRows.length === 0) {
                console.log('User not found for email:', emailFromRequest);
                return false;
            }
    
            const user = userRows[0];
    
            if (user.reset_token && user.reset_token === resetToken && user.reset_token_expires && user.reset_token_expires > new Date()) {
                console.log('Reset token is valid for email:', emailFromRequest);
                return true;
            }
    
            console.log('Reset token is invalid for email:', emailFromRequest);
            return false;
        } catch (error) {
            console.error('Error validating reset token:', error);
            throw error;
        } finally {
            connection.release();
        }
    },
    
    
    invalidateResetToken: async (email) => {
        const connection = await db.getConnection();
    
        try {
            await connection.execute('UPDATE users SET reset_token = NULL, reset_token_expires = NULL WHERE email = ?', [email]);
        } catch (error) {
            console.error('Error invalidating reset token:', error);
            throw error;
        } finally {
            connection.release();
        }
    },
    
};

module.exports = UserModel;

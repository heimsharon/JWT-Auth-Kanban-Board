// Path: server/src/models/user.ts
// This file is used to define the User model
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
// The User model is used to store the user information
export class User extends Model {
    // Hash the password before saving the user
    async setPassword(password) {
        const saltRounds = 12;
        this.password = await bcrypt.hash(password, saltRounds);
    }
    // Validate the password
    async validatePassword(password) {
        return bcrypt.compare(password, this.password);
    }
}
// This function is used to create the User model
export function UserFactory(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'users',
        sequelize,
        hooks: {
            // Hash the password before creating or updating the user
            beforeCreate: async (user) => {
                await user.setPassword(user.password);
            },
            beforeUpdate: async (user) => {
                await user.setPassword(user.password);
            },
        }
    });
    return User;
}

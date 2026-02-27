import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ContactInquiry = sequelize.define('ContactInquiry', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING(50)
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('New', 'Contacted', 'Resolved'),
        defaultValue: 'New'
    }
}, {
    tableName: 'contact_inquiries',
    timestamps: true,
    indexes: [
        { fields: ['status'] },
        { fields: ['date'] }
    ]
});

export default ContactInquiry;

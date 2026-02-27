import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Lead = sequelize.define('Lead', {
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
        type: DataTypes.STRING(50),
        allowNull: false
    },
    source: {
        type: DataTypes.ENUM('Website', 'WhatsApp', 'Email', 'Referral'),
        allowNull: false
    },
    service: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('New', 'In Review', 'Converted', 'Lost'),
        defaultValue: 'New'
    },
    notes: {
        type: DataTypes.TEXT
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    convertedToClientId: {
        type: DataTypes.UUID,
        references: {
            model: 'clients',
            key: 'id'
        }
    }
}, {
    tableName: 'leads',
    timestamps: true,
    indexes: [
        { fields: ['status'] },
        { fields: ['source'] },
        { fields: ['email'] }
    ]
});

export default Lead;

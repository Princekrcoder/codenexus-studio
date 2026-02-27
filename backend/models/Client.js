import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Client = sequelize.define('Client', {
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
        unique: true,
        validate: {
            isEmail: true
        },
        set(value) {
            this.setDataValue('email', value.toLowerCase());
        }
    },
    phone: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    company: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT
    },
    gst: {
        type: DataTypes.STRING(50)
    },
    website: {
        type: DataTypes.STRING(255)
    },
    industry: {
        type: DataTypes.STRING(100)
    },
    type: {
        type: DataTypes.ENUM('Startup', 'Business', 'Personal'),
        defaultValue: 'Business'
    },
    status: {
        type: DataTypes.ENUM('Lead', 'Active', 'On Hold', 'Completed', 'Lost'),
        defaultValue: 'Lead'
    },
    servicePreference: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    paymentStatus: {
        type: DataTypes.ENUM('Paid', 'Unpaid', 'Partial'),
        defaultValue: 'Unpaid'
    }
}, {
    tableName: 'clients',
    timestamps: true,
    indexes: [
        { fields: ['email'], unique: true },
        { fields: ['status'] },
        { fields: ['type'] },
        { fields: ['paymentStatus'] }
    ]
});

export default Client;

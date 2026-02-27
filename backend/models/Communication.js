import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Communication = sequelize.define('Communication', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id'
        }
    },
    type: {
        type: DataTypes.ENUM('Call', 'WhatsApp', 'Email', 'Note'),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    byUserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    internal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    followUp: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'communications',
    timestamps: true,
    indexes: [
        { fields: ['clientId'] },
        { fields: ['type'] },
        { fields: ['date'] },
        { fields: ['followUp'] }
    ]
});

export default Communication;

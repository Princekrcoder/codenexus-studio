import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    projectId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    readBy: {
        type: DataTypes.JSONB,
        defaultValue: []
    }
}, {
    tableName: 'messages',
    timestamps: true,
    indexes: [
        { fields: ['projectId'] },
        { fields: ['timestamp'] },
        { fields: ['senderId'] }
    ]
});

export default Message;

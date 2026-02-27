import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    type: {
        type: DataTypes.ENUM(
            'client_created',
            'project_created',
            'project_status_changed',
            'invoice_created',
            'invoice_paid',
            'lead_converted',
            'file_uploaded',
            'message_sent'
        ),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    relatedId: {
        type: DataTypes.UUID
    },
    relatedModel: {
        type: DataTypes.ENUM('Client', 'Project', 'Invoice', 'Lead')
    }
}, {
    tableName: 'activities',
    timestamps: false,
    createdAt: 'timestamp',
    updatedAt: false,
    indexes: [
        { fields: ['timestamp'], order: [['timestamp', 'DESC']] },
        { fields: ['type'] },
        { fields: ['userId'] }
    ]
});

export default Activity;

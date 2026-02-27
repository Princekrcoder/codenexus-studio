import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const File = sequelize.define('File', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    filename: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    originalName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    path: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mimeType: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    projectId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    uploadedByUserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    uploadDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'files',
    timestamps: true,
    indexes: [
        { fields: ['projectId'] },
        { fields: ['filename'], unique: true }
    ]
});

export default File;

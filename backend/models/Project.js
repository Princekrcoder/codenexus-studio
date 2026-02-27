import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id'
        }
    },
    service: {
        type: DataTypes.ENUM('Website', 'Web App', 'SEO', 'Maintenance'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Delivered'),
        defaultValue: 'Pending'
    },
    deadline: {
        type: DataTypes.DATE
    },
    developerId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 100
        }
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'projects',
    timestamps: true,
    indexes: [
        { fields: ['clientId'] },
        { fields: ['status'] },
        { fields: ['service'] },
        { fields: ['developerId'] }
    ]
});

export default Project;

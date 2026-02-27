import sequelize from '../config/database.js';
import User from './User.js';
import Client from './Client.js';
import Project from './Project.js';
import Lead from './Lead.js';
import Invoice from './Invoice.js';
import Communication from './Communication.js';
import File from './File.js';
import Message from './Message.js';
import Activity from './Activity.js';
import ContactInquiry from './ContactInquiry.js';

// Define associations

// Client associations
Client.hasMany(Project, { foreignKey: 'clientId', as: 'projects' });
Client.hasMany(Invoice, { foreignKey: 'clientId', as: 'invoices' });
Client.hasMany(Communication, { foreignKey: 'clientId', as: 'communications' });
Client.hasOne(Lead, { foreignKey: 'convertedToClientId', as: 'lead' });

// Project associations
Project.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Project.belongsTo(User, { foreignKey: 'developerId', as: 'developer' });
Project.hasMany(Invoice, { foreignKey: 'projectId', as: 'invoices' });
Project.hasMany(File, { foreignKey: 'projectId', as: 'files' });
Project.hasMany(Message, { foreignKey: 'projectId', as: 'messages' });

// Lead associations
Lead.belongsTo(Client, { foreignKey: 'convertedToClientId', as: 'convertedClient' });

// Invoice associations
Invoice.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Invoice.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

// Communication associations
Communication.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Communication.belongsTo(User, { foreignKey: 'byUserId', as: 'user' });

// File associations
File.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
File.belongsTo(User, { foreignKey: 'uploadedByUserId', as: 'uploadedBy' });

// Message associations
Message.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });

// Activity associations
Activity.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User associations
User.hasMany(Project, { foreignKey: 'developerId', as: 'projects' });
User.hasMany(Communication, { foreignKey: 'byUserId', as: 'communications' });
User.hasMany(File, { foreignKey: 'uploadedByUserId', as: 'uploadedFiles' });
User.hasMany(Message, { foreignKey: 'senderId', as: 'messages' });
User.hasMany(Activity, { foreignKey: 'userId', as: 'activities' });

export {
    sequelize,
    User,
    Client,
    Project,
    Lead,
    Invoice,
    Communication,
    File,
    Message,
    Activity,
    ContactInquiry
};

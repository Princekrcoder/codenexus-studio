import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Invoice = sequelize.define('Invoice', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    invoiceId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id'
        }
    },
    projectId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    paid: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    balance: {
        type: DataTypes.VIRTUAL,
        get() {
            return parseFloat(this.amount) - parseFloat(this.paid);
        }
    },
    status: {
        type: DataTypes.ENUM('Paid', 'Unpaid', 'Partial'),
        defaultValue: 'Unpaid'
    },
    paymentMode: {
        type: DataTypes.ENUM('Cash', 'Bank Transfer', 'UPI', 'Card', 'Cheque')
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    dueDate: {
        type: DataTypes.DATE
    },
    notes: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'invoices',
    timestamps: true,
    indexes: [
        { fields: ['invoiceId'], unique: true },
        { fields: ['clientId'] },
        { fields: ['projectId'] },
        { fields: ['status'] }
    ],
    hooks: {
        beforeSave: (invoice) => {
            const balance = parseFloat(invoice.amount) - parseFloat(invoice.paid);
            if (balance === 0) {
                invoice.status = 'Paid';
            } else if (balance > 0 && invoice.paid > 0) {
                invoice.status = 'Partial';
            } else {
                invoice.status = 'Unpaid';
            }
        }
    }
});

// Generate invoice ID before creation
Invoice.beforeCreate(async (invoice) => {
    if (!invoice.invoiceId) {
        const count = await Invoice.count();
        invoice.invoiceId = `INV-${String(count + 1).padStart(4, '0')}`;
    }
});

export default Invoice;

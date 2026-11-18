require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const opts = (tableName) => ({
    tableName,
    underscored: true,
    timestamps: false
});

// Оқытушылар
const Teacher = sequelize.define('Teacher', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, opts('teachers'));

// Курстар
const Course = sequelize.define('Course', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    hours: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, opts('courses'));

// Студенттер
const Student = sequelize.define('Student', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    groupName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, opts('students'));

// Жазылу
const Enrollment = sequelize.define('Enrollment', {
    studentId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    courseId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    enrolledAt: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    grade: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        }
    }
}, opts('enrollments'));

// Байланыстар
Teacher.hasMany(Course, { foreignKey: 'teacherId' });
Course.belongsTo(Teacher, { foreignKey: 'teacherId' });

Student.belongsToMany(Course, {
    through: Enrollment,
    foreignKey: 'studentId'
});

Course.belongsToMany(Student, {
    through: Enrollment,
    foreignKey: 'courseId'
});

Student.hasMany(Enrollment, { foreignKey: 'studentId' });
Enrollment.belongsTo(Student, { foreignKey: 'studentId' });

Course.hasMany(Enrollment, { foreignKey: 'courseId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = {
    sequelize,
    Teacher,
    Course,
    Student,
    Enrollment
};

const express = require('express');

const {
    sequelize,
    Course,
    Teacher,
    Student,
    Enrollment
} = require('./db');

const app = express();
app.use(express.json());

// GET: все курсы
app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: Teacher
        });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: один курс
app.get('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id, {
            include: Teacher
        });

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST: добавить курс
app.post('/courses', async (req, res) => {
    try {
        const { title, description, hours, teacherId } = req.body;

        if (!title || !Number.isInteger(hours) ||
            hours <= 0 || !Number.isInteger(teacherId)) {
            return res.status(400).json({
                message: 'Invalid data'
            });
        }

        const teacher = await Teacher.findByPk(teacherId);

        if (!teacher) {
            return res.status(400).json({
                message: 'Teacher not found'
            });
        }

        const course = await Course.create({
            title,
            description,
            hours,
            teacherId
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT: изменить курс
app.put('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        await course.update(req.body);
        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE: удалить курс
app.delete('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        await course.destroy();

        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST: записать студента на курс
app.post('/enrollments', async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        if (!Number.isInteger(studentId) ||
            !Number.isInteger(courseId)) {
            return res.status(400).json({
                message: 'Invalid IDs'
            });
        }

        const student = await Student.findByPk(studentId);
        const course = await Course.findByPk(courseId);

        if (!student || !course) {
            return res.status(404).json({
                message: 'Student or course not found'
            });
        }

        const existing = await Enrollment.findOne({
            where: { studentId, courseId }
        });

        if (existing) {
            return res.status(409).json({
                message: 'Already enrolled'
            });
        }

        const enrollment = await Enrollment.create({
            studentId,
            courseId
        });

        res.status(201).json(enrollment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET: курсы студента
app.get('/students/:id/courses', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id, {
            include: {
                model: Course,
                through: {
                    attributes: ['enrolledAt', 'grade']
                }
            }
        });

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Запуск сервера
sequelize.authenticate()
    .then(() => {
        app.listen(3000, () => {
            console.log('SERVER STARTED: http://localhost:3000');
        });
    })
    .catch(error => {
        console.error('Database error:', error);
    });


const {
    sequelize,
    Teacher,
    Course,
    Student,
    Enrollment
} = require('./db');

async function test() {
    try {
        await sequelize.authenticate();
        console.log('DATABASE CONNECTED!');

        // 1. Курсы вместе с преподавателями
        const courses = await Course.findAll({
            include: Teacher
        });

        console.log('\nCOURSES:');
        console.log(JSON.stringify(courses, null, 2));

        // 2. Студенты вместе с курсами и оценками
        const students = await Student.findAll({
            include: {
                model: Course,
                through: {
                    attributes: ['grade']
                }
            }
        });

        console.log('\nSTUDENTS:');
        console.log(JSON.stringify(students, null, 2));

        // 3. Добавляем нового студента
        const student = await Student.create({
            fullName: 'Ержан Төлеген',
            email: 'erzhan@mail.com',
            groupName: 'IT-103'
        });

        console.log('\nNEW STUDENT:', student.fullName);

        // 4. Изменяем оценку
        await Enrollment.update(
            { grade: 92 },
            {
                where: {
                    studentId: 1,
                    courseId: 1
                }
            }
        );

        console.log('GRADE UPDATED!');

        // 5. Удаляем запись
        await Enrollment.destroy({
            where: {
                studentId: 4,
                courseId: 2
            }
        });

        console.log('ENROLLMENT DELETED!');

    } catch (error) {
        console.error('ERROR:', error);
    } finally {
        await sequelize.close();
    }
}

test();

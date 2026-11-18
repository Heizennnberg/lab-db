-- 1. Курсы длительностью более 30 часов
SELECT *
FROM courses
WHERE hours > 30
ORDER BY hours DESC
LIMIT 5;

-- 2. Курсы вместе с преподавателями
SELECT courses.title, teachers.full_name
FROM courses
INNER JOIN teachers
ON courses.teacher_id = teachers.id;

-- 3. Курсы, на которые никто не записался
SELECT courses.*
FROM courses
LEFT JOIN enrollments
ON courses.id = enrollments.course_id
WHERE enrollments.student_id IS NULL;

-- 4. Студенты, курсы и оценки
SELECT
    students.full_name,
    courses.title,
    enrollments.grade
FROM students
JOIN enrollments
ON students.id = enrollments.student_id
JOIN courses
ON courses.id = enrollments.course_id;

-- 5. Средняя оценка по курсам выше 70
SELECT
    courses.title,
    AVG(enrollments.grade) AS average_grade
FROM courses
JOIN enrollments
ON courses.id = enrollments.course_id
GROUP BY courses.id, courses.title
HAVING AVG(enrollments.grade) > 70;

-- 6. Студенты с оценкой выше общей средней
SELECT DISTINCT students.full_name
FROM students
JOIN enrollments
ON students.id = enrollments.student_id
WHERE enrollments.grade >
    (SELECT AVG(grade) FROM enrollments);

-- 7. Изменение оценки
UPDATE enrollments
SET grade = 95
WHERE student_id = 1 AND course_id = 1;

-- 8. Удаление записи
DELETE FROM enrollments
WHERE student_id = 4 AND course_id = 2;

-- 9. Транзакция
BEGIN;

INSERT INTO enrollments
(student_id, course_id, enrolled_at, grade)
VALUES (2, 3, CURRENT_DATE, NULL);

UPDATE enrollments
SET grade = 88
WHERE student_id = 2 AND course_id = 3;

COMMIT;

-- 10. Создание индекса
CREATE INDEX idx_courses_hours
ON courses(hours);

-- Проверка плана запроса
EXPLAIN ANALYZE
SELECT *
FROM courses
WHERE hours > 30;
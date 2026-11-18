
-- 1. Оқытушылар
INSERT INTO teachers (full_name, email) VALUES
('Азамат Нұрланов', 'azamat@mail.com'),
('Айгүл Серікқызы', 'aigul@mail.com'),
('Данияр Ермеков', 'daniyar@mail.com'),
('Мадина Қасымова', 'madina@mail.com');

-- 2. Студенттер
INSERT INTO students (full_name, email, group_name) VALUES
('Алихан Беков', 'ali@mail.com', 'IT-101'),
('Аружан Сейтова', 'aru@mail.com', 'IT-101'),
('Нұрсұлтан Әлиев', 'nur@mail.com', 'IT-102'),
('Дана Мұратова', 'dana@mail.com', 'IT-102');

-- 3. Курстар
INSERT INTO courses (title, description, hours, teacher_id) VALUES
('PostgreSQL', 'Дерекқор негіздері', 40, 1),
('JavaScript', 'JavaScript бағдарламалау', 35, 2),
('Node.js', 'Backend әзірлеу', 45, 3),
('HTML CSS', 'Web дизайн негіздері', 25, 4);

-- 4. Студенттердің курстарға жазылуы
INSERT INTO enrollments
(student_id, course_id, enrolled_at, grade) VALUES
(1, 1, '2026-09-01', 85),
(2, 1, '2026-09-02', 90),
(3, 2, '2026-09-03', 75),
(4, 2, '2026-09-04', 95),
(1, 3, '2026-09-05', 80);

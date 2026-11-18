TRUNCATE enrollments, courses, students, teachers RESTART IDENTITY CASCADE;
INSERT INTO teachers (full_name, email) VALUES
  ('Айдар Нурланов', 'aidar@center.kz'),
  ('Мария Ким', 'maria@center.kz'),
  ('Ербол Садыков', 'erbol@center.kz'),
  ('Алия Омарова', 'aliya@center.kz');

INSERT INTO students (full_name, email, group_name) VALUES
  ('Данияр Ахметов', 'daniyar@mail.kz', 'IT-21'),
  ('Айгерим Бекова', 'aigerim@mail.kz', 'IT-21'),
  ('Тимур Сейтов', 'timur@mail.kz', 'IT-22'),
  ('Сабина Жумабаева', 'sabina@mail.kz', 'IT-22'),
  ('Нурлан Ким', 'nurlan@mail.kz', 'IT-23');

INSERT INTO courses (title, description, hours, teacher_id) VALUES
  ('SQL для начинающих', 'Основы реляционных баз данных', 40, 1),
  ('Node.js и REST API', 'Создание серверной части', 60, 2),
  ('Python', 'Программирование на Python', 30, 3),
  ('Веб-дизайн', 'Основы UI и верстки', 24, 4),
  ('Алгоритмы', 'Базовые структуры данных', 50, 1);

INSERT INTO enrollments (student_id, course_id, enrolled_at, grade) VALUES
  (1, 1, '2026-09-01', 85),
  (1, 2, '2026-09-02', 72),
  (2, 1, '2026-09-01', 90),
  (2, 3, '2026-09-05', 65),
  (3, 2, '2026-09-03', 78),
  (3, 5, '2026-09-04', NULL),
  (4, 1, '2026-09-06', 55),
  (5, 3, '2026-09-07', 95);
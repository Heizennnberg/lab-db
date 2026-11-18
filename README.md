# lab-db

## ER-диаграмма

```mermaid
erDiagram
  TEACHERS ||--o{ COURSES : teaches
  STUDENTS ||--o{ ENROLLMENTS : has
  COURSES ||--o{ ENROLLMENTS : has

  TEACHERS {
    int id PK
    string full_name
    string email UK
  }
  COURSES {
    int id PK
    string title
    string description
    int hours
    int teacher_id FK
  }
  STUDENTS {
    int id PK
    string full_name
    string email UK
    string group_name
  }
  ENROLLMENTS {
    int student_id PK, FK
    int course_id PK, FK
    date enrolled_at
    int grade
  }
```

## Нормальная форма (3НФ)

Все атрибуты атомарные, повторяющихся групп нет, поэтому схема в 1НФ. В `enrollments` составной ключ (student_id, course_id), а enrolled_at и grade зависят от пары целиком, поэтому нет частичных зависимостей (2НФ). Данные о преподавателе, курсе и студенте хранятся в своих таблицах и не дублируются, а неключевые атрибуты зависят только от ключа, так что транзитивных зависимостей нет (3НФ).

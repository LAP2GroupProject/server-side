TRUNCATE users,
habits RESTART IDENTITY;

INSERT INTO
  users (name, email, password)
VALUES
  ('test', 'test@test.com', 'testPassword');

INSERT INTO
  habits (
    habit,
    frequency,
    streak,
    lastComplete,
    completeToday,
    user_id
  )
VALUES
  ('testhabit1', 2, 3, 0, FALSE, 1),
  ('testhabit2', 5, 1, 461328, TRUE, 1);

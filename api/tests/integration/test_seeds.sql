TRUNCATE users RESTART IDENTITY;

INSERT INTO
  authors (name, email, password)
VALUES
  ('Test User 1', 'testemail1@test.com', 'secret_password1'),
  ('Test User 2', 'testemail2@test.com', 'secret_password2');

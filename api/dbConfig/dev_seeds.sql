INSERT INTO users (name,email,password) 
VALUES
    ('admin', 'admin@admin.com', '$2b$10$NHvUyBBXwXYjbUI4Qi931.BKJmjBXz2tPl0VUAo7QmxsTYbSl93d2' ),       --passwords need to be hashed
    ('krish','ksirhs8@gmail.com', 'passkris'),
    ('nabin', 'nabin7@yahoo.com', 'passnabin');


INSERT INTO habits (habit,frequency,streak,user_id) 
VALUES
    ('sleep',2,3,1),
    ('exercise', 3,4,2);

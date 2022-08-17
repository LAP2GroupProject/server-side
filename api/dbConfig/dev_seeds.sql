INSERT INTO users (name,email,password) 
VALUES
    ('admin', 'admin@admin.com', '$2b$10$NHvUyBBXwXYjbUI4Qi931.BKJmjBXz2tPl0VUAo7QmxsTYbSl93d2' );       --passwords need to be hashed


INSERT INTO habits (habit,frequency,streak,lastComplete,completeToday,user_id) 
VALUES
    ('sleep',2,3,0,FALSE,1),
    ('exercise', 5,1,0,FALSE,1);

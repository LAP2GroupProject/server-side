INSERT INTO users (name,email,password) 
VALUES
    ('admin', 'admin@admin.com', '$2b$10$NHvUyBBXwXYjbUI4Qi931.BKJmjBXz2tPl0VUAo7QmxsTYbSl93d2' );       --passwords need to be hashed


INSERT INTO habits (habit,frequency,streak,lastComplete,completeToday,lastCompleteDay,user_id) 
VALUES
    ('sleep',2,3,0,TRUE,17,1),
    ('exercise',5,1,27679680,FALSE,18,1),
    ('water',2,7,27679680,TRUE,17,1);



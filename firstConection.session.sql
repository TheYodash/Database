
CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (category_id),
    UNIQUE (category_name)
);

Create table if not exists ingredients (
	ingredient_id INT AUTO_INCREMENT,
    ingredient_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (ingredient_id),
    UNIQUE (ingredient_name)
);

CREATE TABLE steps (
    step_id INT AUTO_INCREMENT,
    step_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (step_id),
    UNIQUE (step_name)
);

create table recipes (
	recipe_id int auto_increment,
    recipe_name varchar(100) not null,
    ingredient1_id int,
    ingredient2_id int,
    ingredient3_id int,
    category1_id int,
    category2_id int,
    category3_id int,
	step1_id int,
    step2_id int,
    step3_id int,
    primary key (recipe_id),
    foreign key (ingredient1_id) references ingredients(ingredient_id),
	foreign key (category1_id,category2_id,category3_id) references categories(category_id),
    foreign key (step1_id,step2_id,step3_id) references steps(step_id),
    unique (recipe_name)
);

insert into categories (category_name)
values ('Appetizers'), ('Main Course'), ('Side Dishes'), ('Desserts');

insert into ingredients (ingredient_name)
values ('Tomatoes'), ('cucumber'),('Beef'), ('Jam'), ('Milk'),('cheese'),('butter'),('puff pastry') ;

insert into steps (step_name)
values ('dice veggies'), ('cook beef'),('stack puff pastry'), ('spread jam'), ('add milk to the pastry'),('add cheese'),('add butter');

insert into recipes (recipe_name,
    ingredient1_id,
    ingredient2_id,
    ingredient3_id,
    category1_id,
    category2_id,
    category3_id,
    step1_id,
    step2_id,
    step3_id)
    
    values('Greek Salad', 1,2,6,1,null,null,1,6,null),('steak',3,7,null,2,null,null,7,2,null),('Pie',4,5,8,4,null,null,3,4,5);


SELECT * FROM categories;
SELECT * FROM ingredients;
SELECT * FROM steps;
SELECT * FROM recipes;
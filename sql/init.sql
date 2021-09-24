create extension if not exists "uuid-ossp";

create table if not exists application_user(
    id uuid default uuid_generate_v4(),
    username varchar not null,
    password varchar not null ,
    primary key (id)
    );

-- caso queira cria uma sequence
-- CREATE SEQUENCE name_id_seq
--     INCREMENT 1
--     MINVALUE 1
--     MAXVALUE 9223372036854775807
--     START 1
--     CACHE 1;
-- ALTER TABLE example ALTER COLUMN id SET DEFAULT NEXTVAL('name_id_seq'::regclass);

SHOW search_path;

select * from application_user;

create extension if not exists "pgcrypto";

insert into application_user(username, password) VALUES ('Gilson', crypt('1234', 'soctop'));

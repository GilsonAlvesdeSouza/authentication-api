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

select id, username from application_user
where id = 'dfe5d667-69a9-4eb2-83f0-9f77678a6b8f';

UPDATE application_user
SET password='dsdfas123456789',username='Fulano'
WHERE id='e0d53edb-c765-408d-897e-9c66fdcfad20';

delete from application_user where id='4b9c8c45-aa26-49eb-83d4-7f368c7e69c9';

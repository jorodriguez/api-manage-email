

create table suscriptions(
	id serial not null primary key,
	name text not null,
	from_name text not null,
	host text not null,
	port numeric not null,	
	user_name text not null,
	pass text not null,
	secureConnection boolean default false,
	tls boolean default false,
	ciphers text,
	api_key text not null,
	active boolean default false
)

 

create table suscriptions(
	id serial not null primary key,
	name text not null,
	from_name text not null,
	host text not null,
	port numeric not null,	
	user_name text not null,
	pass text not null,
	secureConnection boolean default false,
	tls boolean default false,
	ciphers text,
	api_key text not null default gen_random_uuid(),
	active boolean default true
)

--alter table suscriptions alter column api_key set default gen_random_uuid();

create table log(
	id serial not null primary key,
	suscriptions_id int not null references suscriptions(id),	
	type text not null,	
	para text,
	cc text,
	cco text,
	html text,
	validation_emails text,	
	log text,	
	active boolean default false
);



select * from suscriptions

alter table suscriptions alter column active set default true

SELECT * FROM SUSCRIPTIONS WHERE API_KEY = '285dc1b3-0623-45ff-ab0d-bd2b0fd6aae3' AND ACTIVE

insert into suscriptions(name,from_name,host,port,user_name,pass,secureconnection,tls,ciphers,api_key)
values('TESTING-API','Joel Testing api<joel@magicintelligence.com>','magicintelligence.com',465,'joel@magicintelligence.com','x9F@*M2d5mi%%7a',true,true,'SSLv3','285dc1b3-0623-45ff-ab0d-bd2b0fd6aae3');




--prueba cuando no existe una susciption
update suscriptions set active = true where id = 1

--cuando no esta bien escrito el dns o expiro
update suscriptions set host = 'magicintelligence.com' where id =1



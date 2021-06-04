DROP TABLE SUSCRIPTIONS

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


select * from suscriptions where active = false


-- prueba para cuando no existe una suscripcion
update suscriptions set active = false where id = 1;


--prueba  cuando no esta bien configurado el host o alguna otra configuracion
update suscriptions set host = "agicintelligence.com" where id = 1;

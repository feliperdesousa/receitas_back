create table receitas (
	id serial primary key,
	nome varchar(250) not null,
	ingredientes varchar(255) not null,
	intrucoes text not null,
	tempo_preparo_minutos integer not null,
	criado_em timestamp default current_timestamp,
	usuario_id integer not null references usuarios(id) on delete cascade
);

create table receitas (
	id serial primary key,
	nome varchar(250) not null,
	ingredientes varchar(255) not null,
	intrucoes text not null,
	tempo_preparo_minutos integer not null,
	criado_em timestamp default current_timestamp,
	usuario_id integer not null references usuarios(id) on delete cascade
);
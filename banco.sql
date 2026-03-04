create table usuarios (
	id serial primary key,
	nome varchar(255),
	senha varchar(255),
	ativo boolean default true,
	criado_em timestamp default current_timestamp
);

create table receitas (
	id serial primary key,
	nome varchar(255) not null,
	ingredientes text not null,
	intrucoes text not null,
	tempo_preparo_minutos integer not null,
	criado_em timestamp default current_timestamp,
	usuario_id integer not null references usuarios(id) on delete cascade
);
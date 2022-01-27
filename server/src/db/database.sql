create type roleEnum as enum ('regular', 'admin', 'eventOrganizer');

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	email VARCHAR UNIQUE NOT NULL,
	description VARCHAR,
	username VARCHAR UNIQUE NOT NULL,
	salt VARCHAR NOT NULL,
	hash VARCHAR NOT NULL,
	role roleEnum DEFAULT 'regular',
	latitude DECIMAL NOT NULL,
	longitude DECIMAL NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT Now()
);

create table games (
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	release_year INT NOT NULL,
	description VARCHAR NOT NULL,
	min_players INT NOT NULL,
	max_players INT NOT NULL,
	image_url VARCHAR
);

create table sessions (
	id SERIAL PRIMARY KEY,
	date DATE NOT NULL,
	time TIME NOT NULL,
	game_id INT NOT NULL,
	description VARCHAR,
	creator_id INT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT Now(),
	session_finished BOOLEAN NOT NULL DEFAULT false,
	CONSTRAINT game_id
	FOREIGN KEY(game_id)
		REFERENCES games(id)
		ON DELETE SET NULL
		ON UPDATE CASCADE,	
	CONSTRAINT creator_id
	FOREIGN KEY(creator_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE	
);

create table users_games(
	user_id INT NOT NULL,
	game_id INT NOT NULL,
	PRIMARY KEY (user_id, game_id),
	CONSTRAINT user_id
	FOREIGN KEY(user_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT game_id
	FOREIGN KEY(game_id)
		REFERENCES games(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE	
);


create table users_games(
	user_id INT NOT NULL,
	game_id INT NOT NULL,
	PRIMARY KEY (user_id, game_id),
	CONSTRAINT user_id
	FOREIGN KEY(user_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT game_id
	FOREIGN KEY(game_id)
		REFERENCES games(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE	
);

create table game_votes (
	session_id INT NOT NULL,
	game_id INT NOT NULL,
	voter_id INT NOT NULL,
	PRIMARY KEY (session_id, game_id),
	CONSTRAINT session_id
	FOREIGN KEY(session_id)
		REFERENCES sessions(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
		CONSTRAINT game_id
	FOREIGN KEY(game_id)
		REFERENCES games(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT voter_id
	FOREIGN KEY(voter_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	
);

create table users_sessions(
	user_id INT NOT NULL,
	session_id INT NOT NULL,
	PRIMARY KEY (user_id, session_id),
	CONSTRAINT user_id
	FOREIGN KEY(user_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT session_id
	FOREIGN KEY(session_id)
		REFERENCES sessions(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE	
);

create table ratings(
	value INT NOT NULL,
	giver_id INT NOT NULL,
	receiver_id INT NOT NULL,
	PRIMARY KEY(giver_id, receiver_id),
	CONSTRAINT giver_id
		FOREIGN KEY(giver_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT receiver_id
		FOREIGN KEY(receiver_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE	
);

create type statusEnum as enum ('1', '2', '3');

create table friends(
	sender_id INT NOT NULL,
	receiver_id INT NOT NULL,
	PRIMARY KEY (sender_id, receiver_id),
	status statusEnum DEFAULT '1',
	invite_sent_at TIMESTAMPTZ NOT NULL DEFAULT Now(),
	CONSTRAINT receiver_id
		FOREIGN KEY(receiver_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT sender_id
		FOREIGN KEY(sender_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

create table blacklist(
	user_id INT NOT NULL,
	blacklisted_id INT NOT NULL,
	PRIMARY KEY (user_id, blacklisted_id),
	CONSTRAINT user_id
		FOREIGN KEY(user_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT blacklisted_id
		FOREIGN KEY(blacklisted_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE	
);

create table messages(
	id SERIAL PRIMARY KEY,
	message VARCHAR NOT NULL,
	sender_id INT NOT NULL,
	receiver_id INT NOT NULL,
	sent_at TIMESTAMPTZ NOT NULL DEFAULT Now(),
	has_read BOOLEAN NOT NULL DEFAULT false,
	CONSTRAINT sender_id
	FOREIGN KEY(sender_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT receiver_id
	FOREIGN KEY(receiver_id)
		REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);




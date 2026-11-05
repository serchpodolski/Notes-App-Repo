CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('John Doe', 'www.johndoe.com', 'Example Blog');
INSERT INTO blogs (author, url, title) VALUES ('Jane Doe', 'www.janedoe.com', 'Example Blog 2');
INSERT INTO blogs (author, url, title) VALUES ('Mr. Mister', 'www.mr-mister.com', 'Example Blog 3');
INSERT INTO blogs (author, url, title) VALUES ('Ms. Mistress', 'www.ms-mistress.com', 'Example Blog 4');
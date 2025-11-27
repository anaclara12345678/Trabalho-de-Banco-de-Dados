CREATE DATABASE IF NOT EXISTS alocacao;
USE alocacao;

CREATE TABLE IF NOT EXISTS professores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  email VARCHAR(200),
  telefone VARCHAR(50),
  departamento VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS disciplinas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(50),
  nome VARCHAR(200) NOT NULL,
  curso VARCHAR(200),
  periodo INT,
  carga_horaria INT
);

CREATE TABLE IF NOT EXISTS salas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  capacidade INT,
  tipo VARCHAR(100),
  recursos TEXT
);

CREATE TABLE IF NOT EXISTS horarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dia VARCHAR(50),
  inicio VARCHAR(10),
  fim VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS periodos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ano INT,
  semestre INT
);

CREATE TABLE IF NOT EXISTS alocacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  professor_id INT,
  disciplina_id INT,
  sala_id INT,
  horario_id INT,
  periodo_id INT,
  observacoes TEXT,
  CONSTRAINT fk_prof FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL,
  CONSTRAINT fk_disc FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE SET NULL,
  CONSTRAINT fk_sala FOREIGN KEY (sala_id) REFERENCES salas(id) ON DELETE SET NULL,
  CONSTRAINT fk_hor FOREIGN KEY (horario_id) REFERENCES horarios(id) ON DELETE SET NULL,
  CONSTRAINT fk_per FOREIGN KEY (periodo_id) REFERENCES periodos(id) ON DELETE SET NULL
);

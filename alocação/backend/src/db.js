import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'alocacao',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10
});

export async function init() {
  const conn = await pool.getConnection();

  try {
    // --- TABELAS ---
    await conn.query(`
      CREATE TABLE IF NOT EXISTS professores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(200) NOT NULL,
        email VARCHAR(200),
        telefone VARCHAR(50),
        departamento VARCHAR(150)
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS disciplinas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        codigo VARCHAR(50),
        nome VARCHAR(200) NOT NULL,
        curso VARCHAR(200),
        periodo INT,
        carga_horaria INT
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS salas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        capacidade INT,
        tipo VARCHAR(100),
        recursos TEXT
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS horarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        dia VARCHAR(50),
        inicio VARCHAR(10),
        fim VARCHAR(10)
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS periodos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ano INT,
        semestre INT
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS alocacoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        professor_id INT,
        disciplina_id INT,
        sala_id INT,
        horario_id INT,
        periodo_id INT,
        observacoes TEXT,
        FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL,
        FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE SET NULL,
        FOREIGN KEY (sala_id) REFERENCES salas(id) ON DELETE SET NULL,
        FOREIGN KEY (horario_id) REFERENCES horarios(id) ON DELETE SET NULL,
        FOREIGN KEY (periodo_id) REFERENCES periodos(id) ON DELETE SET NULL
      )
    `);

    // --- SEEDS ---

    const [[{ c: pCount }]] = await conn.query(
      'SELECT COUNT(*) AS c FROM professores'
    );
    if (pCount === 0) {
      await conn.query(
        `INSERT INTO professores (nome,email,telefone,departamento) VALUES ?`,
        [[
          ['Dr. João Silva', 'joao.silva@pucminas.br', '3133334444', 'Ciência da Computação'],
          ['Profa. Maria Santos', 'maria.santos@pucminas.br', '3198887777', 'Engenharia de Software'],
          ['Dr. Carlos Oliveira', 'carlos.oliveira@pucminas.br', '3195554444', 'Matemática']
        ]]
      );
    }

    const [[{ c: dCount }]] = await conn.query(
      'SELECT COUNT(*) AS c FROM disciplinas'
    );
    if (dCount === 0) {
      await conn.query(
        `INSERT INTO disciplinas (codigo,nome,curso,periodo,carga_horaria) VALUES ?`,
        [[
          ['CC101', 'Programação I', 'Ciência da Computação', 1, 60],
          ['CC201', 'Estruturas de Dados', 'Ciência da Computação', 2, 60],
          ['ES101', 'Engenharia de Software I', 'Engenharia de Software', 1, 60],
          ['MAT101', 'Cálculo I', 'Ciência da Computação', 1, 60]
        ]]
      );
    }

    const [[{ c: sCount }]] = await conn.query(
      'SELECT COUNT(*) AS c FROM salas'
    );
    if (sCount === 0) {
      await conn.query(
        `INSERT INTO salas (nome,capacidade,tipo,recursos) VALUES ?`,
        [[
          ['101 (A)', 40, 'Sala Comum', 'Projetor'],
          ['202 (B)', 30, 'Laboratório', 'Projetor, Ar condicionado'],
          ['305 (C)', 50, 'Sala Comum', ''],
          ['Auditório Principal', 150, 'Auditório', 'Som, Projetor']
        ]]
      );
    }

    const [[{ c: hCount }]] = await conn.query(
      'SELECT COUNT(*) AS c FROM horarios'
    );
    if (hCount === 0) {
      await conn.query(
        `INSERT INTO horarios (dia,inicio,fim) VALUES ?`,
        [[
          ['Segunda-feira', '09:20', '11:00'],
          ['Quarta-feira', '19:00', '21:00']
        ]]
      );
    }

    const [[{ c: peCount }]] = await conn.query(
      'SELECT COUNT(*) AS c FROM periodos'
    );
    if (peCount === 0) {
      await conn.query(
        `INSERT INTO periodos (ano,semestre) VALUES ?`,
        [[
          [2025, 1],
          [2025, 2]
        ]]
      );
    }

  } finally {
    conn.release();
  }
}

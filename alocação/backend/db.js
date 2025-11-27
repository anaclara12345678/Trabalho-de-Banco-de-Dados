import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Paulabessa21.',
  database: process.env.DB_NAME || 'alocacao',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10
});

export async function initDb(){
  const conn = await pool.getConnection();
  try {
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    await conn.query(`USE \`${process.env.DB_NAME}\``);

    // Professores
    await conn.query(`CREATE TABLE IF NOT EXISTS professores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(200) NOT NULL,
      email VARCHAR(200),
      telefone VARCHAR(50),
      departamento VARCHAR(150)
    )`);

    // Disciplinas
    await conn.query(`CREATE TABLE IF NOT EXISTS disciplinas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      codigo VARCHAR(50),
      nome VARCHAR(200) NOT NULL,
      curso VARCHAR(200),
      periodo INT,
      carga_horaria INT
    )`);

    // Salas
    await conn.query(`CREATE TABLE IF NOT EXISTS salas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(150) NOT NULL,
      capacidade INT,
      tipo VARCHAR(100),
      recursos TEXT
    )`);

    // Horarios
    await conn.query(`CREATE TABLE IF NOT EXISTS horarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      dia VARCHAR(50),
      inicio VARCHAR(10),
      fim VARCHAR(10)
    )`);

    // Periodos
    await conn.query(`CREATE TABLE IF NOT EXISTS periodos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ano INT,
      semestre INT
    )`);

    // Alocacoes
    await conn.query(`CREATE TABLE IF NOT EXISTS alocacoes (
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
    )`);

    // Seeds mínimos (só se vazio)
    const [[{c:pc}]] = await conn.query('SELECT COUNT(*) as c FROM professores');
    if (pc === 0){
      await conn.query(`INSERT INTO professores (nome,email,telefone,departamento) VALUES ?`, [
        [
          ['Dr. João Silva','joao.silva@pucminas.br','3133334444','Ciência da Computação'],
          ['Profa. Maria Santos','maria.santos@pucminas.br','3198887777','Engenharia de Software']
        ]
      ]);
    }

    const [[{c:dc}]] = await conn.query('SELECT COUNT(*) as c FROM disciplinas');
    if (dc === 0){
      await conn.query(`INSERT INTO disciplinas (codigo,nome,curso,periodo,carga_horaria) VALUES ?`, [
        [
          ['CC101','Programação I','Ciência da Computação',1,60],
          ['CC201','Estruturas de Dados','Ciência da Computação',2,60]
        ]
      ]);
    }

    const [[{c:sc}]] = await conn.query('SELECT COUNT(*) as c FROM salas');
    if (sc === 0){
      await conn.query(`INSERT INTO salas (nome,capacidade,tipo,recursos) VALUES ?`, [
        [
          ['202 (B)',30,'Laboratório','Projetor, Ar condicionado'],
          ['101 (A)',40,'Sala Comum','Projetor']
        ]
      ]);
    }

    const [[{c:hc}]] = await conn.query('SELECT COUNT(*) as c FROM horarios');
    if (hc === 0){
      await conn.query(`INSERT INTO horarios (dia,inicio,fim) VALUES ?`, [
        [
          ['Segunda-feira','09:20','11:00'],
          ['Quarta-feira','19:00','21:00']
        ]
      ]);
    }

    const [[{c:pcd}]] = await conn.query('SELECT COUNT(*) as c FROM periodos');
    if (pcd === 0){
      await conn.query(`INSERT INTO periodos (ano,semestre) VALUES ?`, [
        [
          [2025,1],
          [2025,2]
        ]
      ]);
    }

  } finally {
    conn.release();
  }
}

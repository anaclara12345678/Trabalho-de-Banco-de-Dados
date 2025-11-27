from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # libera o acesso do front-end

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="SENHA_AQUI",
        database="alocacao_db"
    )

@app.post("/filtrar")
def filtrar():
    dados = request.json
    letra = dados.get("letra", "")
    horaInicial = dados.get("horaInicial", "")
    horaFinal = dados.get("horaFinal", "")
    cursos = dados.get("cursos", [])

    query = """
        SELECT 
            p.nome AS professor,
            d.nome AS disciplina,
            c.nome AS curso,
            h.hora_inicio,
            h.hora_fim
        FROM alocacao a
        JOIN professor p ON a.id_professor = p.id_professor
        JOIN disciplina d ON a.id_disciplina = d.id_disciplina
        JOIN curso c ON d.id_curso = c.id_curso
        JOIN horario h ON a.id_horario = h.id_horario
        WHERE 1=1
    """
    params = []

    if letra:
        query += " AND p.nome LIKE %s"
        params.append(letra + "%")

    if horaInicial and horaFinal:
        query += " AND h.hora_inicio >= %s AND h.hora_fim <= %s"
        params.extend([horaInicial, horaFinal])

    if cursos:
        query += " AND c.nome IN (" + ",".join(["%s"] * len(cursos)) + ")"
        params.extend(cursos)

    query += " ORDER BY p.nome, h.hora_inicio"

    con = conectar()
    cursor = con.cursor(dictionary=True)
    cursor.execute(query, params)
    resultados = cursor.fetchall()
    cursor.close()
    con.close()

    return jsonify(resultados)

if __name__ == "__main__":
    app.run(debug=True)

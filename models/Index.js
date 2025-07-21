import sequelize from './../config/database.js';

import UsuarioModel from './Usuario.js';
import CursoModel from './Curso.js';
import AulaModel from './Aula.js';
import MatriculaModel from './Matricula.js';
import ProgressoModel from './Progresso.js';
import ComentarioModel from './Comentario.js';

// Instanciação dos models
const Usuario = UsuarioModel(sequelize);
const Curso = CursoModel(sequelize);
const Aula = AulaModel(sequelize);
const Matricula = MatriculaModel(sequelize);
const Progresso = ProgressoModel(sequelize);
const Comentario = ComentarioModel(sequelize);

// RELACIONAMENTOS

// Usuario -> Curso (instrutor)
Usuario.hasMany(Curso, { foreignKey: 'instrutorId', as: 'cursos' });
Curso.belongsTo(Usuario, { foreignKey: 'instrutorId', as: 'instrutor' });

// Curso -> Aula
Curso.hasMany(Aula, { foreignKey: 'cursoId', as: 'aulas' });
Aula.belongsTo(Curso, { foreignKey: 'cursoId', as: 'curso' });

// Usuario -> Matricula (aluno)
Usuario.hasMany(Matricula, { foreignKey: 'usuarioId', as: 'matriculas' });
Matricula.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'aluno' });

// Curso -> Matricula
Curso.hasMany(Matricula, { foreignKey: 'cursoId', as: 'matriculas' });
Matricula.belongsTo(Curso, { foreignKey: 'cursoId', as: 'curso' });

// Matricula -> Progresso
Matricula.hasMany(Progresso, { foreignKey: 'matriculaId', as: 'progresso' });
Progresso.belongsTo(Matricula, { foreignKey: 'matriculaId', as: 'matricula' });

// Aula -> Progresso
Aula.hasMany(Progresso, { foreignKey: 'aulaId', as: 'progresso' });
Progresso.belongsTo(Aula, { foreignKey: 'aulaId', as: 'aula' });

// Curso -> Comentario
Curso.hasMany(Comentario, { foreignKey: 'cursoId', as: 'comentarios' });
Comentario.belongsTo(Curso, { foreignKey: 'cursoId', as: 'curso' });

// Usuario -> Comentario
Usuario.hasMany(Comentario, { foreignKey: 'usuarioId', as: 'comentarios' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'autor' });

// Exportação dos models
export {
  sequelize,
  Usuario,
  Curso,
  Aula,
  Matricula,
  Progresso,
  Comentario
};

import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Curso = sequelize.define('Curso', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT
    },
    categoria: {
      type: DataTypes.STRING
    }
  });

  Curso.associate = (models) => {
    Curso.belongsTo(models.Usuario, { foreignKey: 'instrutorId', as: 'instrutor' });
    Curso.hasMany(models.Aula, { foreignKey: 'cursoId', as: 'aulas' });
    Curso.hasMany(models.Matricula, { foreignKey: 'cursoId', as: 'matriculas' });
    Curso.hasMany(models.Comentario, { foreignKey: 'cursoId', as: 'comentarios' });
  };

  return Curso;
};

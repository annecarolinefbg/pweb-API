import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Matricula = sequelize.define('Matricula', {
    data: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  Matricula.associate = (models) => {
    Matricula.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'aluno' });
    Matricula.belongsTo(models.Curso, { foreignKey: 'cursoId', as: 'curso' });
    Matricula.hasMany(models.Progresso, { foreignKey: 'matriculaId', as: 'progresso' });
  };

  return Matricula;
};

import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Aula = sequelize.define('Aula', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Aula.associate = (models) => {
    Aula.belongsTo(models.Curso, { foreignKey: 'cursoId', as: 'curso' });
    Aula.hasMany(models.Progresso, { foreignKey: 'aulaId', as: 'progresso' });
  };

  return Aula;
};

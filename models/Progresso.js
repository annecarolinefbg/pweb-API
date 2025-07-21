import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Progresso = sequelize.define('Progresso', {
    concluido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Progresso.associate = (models) => {
    Progresso.belongsTo(models.Matricula, { foreignKey: 'matriculaId', as: 'matricula' });
    Progresso.belongsTo(models.Aula, { foreignKey: 'aulaId', as: 'aula' });
  };

  return Progresso;
};

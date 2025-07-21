import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Comentario = sequelize.define('Comentario', {
    texto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nota: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  });

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'autor' });
    Comentario.belongsTo(models.Curso, { foreignKey: 'cursoId', as: 'curso' });
  };

  return Comentario;
};

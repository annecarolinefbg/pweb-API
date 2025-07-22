import { DataTypes } from 'sequelize';
import { dataTypes } from 'sequelize-test-helpers';

export default (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
   id: {
    type:DataTypes.INTEGER,
    allowNull:true,
    primaryKey: true
   },

    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('aluno', 'instrutor'),
      allowNull: false
    }
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Curso, { foreignKey: 'instrutorId', as: 'cursos' });
    Usuario.hasMany(models.Matricula, { foreignKey: 'usuarioId', as: 'matriculas' });
    Usuario.hasMany(models.Comentario, { foreignKey: 'usuarioId', as: 'comentarios' });
  };

  return Usuario;
};

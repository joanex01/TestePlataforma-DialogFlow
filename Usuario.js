const {Model} = require('sequelize');
const {DataTypes} = require('sequelize');

class Usuario extends Model {
    static init(sequelize){
        super.init({
            plataforma: DataTypes.STRING,
            //nome: DataTypes.STRING,
            //email: DataTypes.STRING,
            //data_nascimento: DataTypes.DATEONLY,
            //sexo: DataTypes.STRING,
        },{
            sequelize,
            tableName: 'usuarios'
        })
    }

    static associate(models){
        this.hasMany(models.Doacao, {foreignKey: 'id_usuario', as: 'doacoes'});
        this.belongsToMany(models.Equipe, {
            through: 'EquipeUsuario',
            foreignKey: 'id_usuario',
            as: 'equipe'
        })
    }
}


module.exports = Usuario;
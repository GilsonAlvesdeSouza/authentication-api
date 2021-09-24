const {Model, DataTypes} = require('sequelize');

class Users extends Model {
    static init(sequelize: any) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },{
            sequelize
        })
    }
}

// module.exports = Users;
export default Users;

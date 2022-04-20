import { Model } from 'sequelize';

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      uuid:
 *        type: string
 *        description: Unique identifier for the user
 *      name:
 *        type: string
 *        description: Name of the user
 *      username:
 *        type: string
 *        description: Username of the user
 *      email:
 *        type: string
 *        description: Email of the user
 *      password:
 *        type: string
 *        description: Password of the user
 *      confirmed:
 *        type: boolean
 *        description: Whether the user has confirmed their email address
 *      role:
 *        type: string
 *        description: Role of the user
 *      required:
 *        - uuid
 *        - name
 *        - username
 *        - email
 *        - password
 *        - confirmed
 *        - role
 */

const userModel = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Review }) {
      // define association here
      this.hasOne(Review, { foreignKey: 'userId', as: 'review' });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a name' },
          notEmpty: { msg: 'Name must not be empty' },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'User must have a username' },
          notEmpty: { msg: 'Username must not be empty' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'User must have an email' },
          notEmpty: { msg: 'Email cannot be empty' },
          isEmail: { msg: 'Must be a valid email address' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a password' },
          notEmpty: { msg: 'Password must not be empty' },
        },
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {
      sequelize,
      tableName: 'user',
      modelName: 'User',
    }
  );
  return User;
};

export default userModel;

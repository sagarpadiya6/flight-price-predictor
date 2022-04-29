import { Model } from 'sequelize';

/**
 * @swagger
 * definitions:
 *    Review:
 *      type: object
 *      properties:
 *        uuid:
 *          type: string
 *          description: Unique identifier for the review
 *        star:
 *          type: integer
 *          description: Star rating for the review
 *        review:
 *          type: string
 *          description: Review for the review
 *        recommendation:
 *          type: boolean
 *          description: Whether the user recommends the product
 *        required:
 *          - uuid
 *          - star
 *          - review
 *          - recommendation
 */

const reviewModel = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  }
  Review.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      star: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Star rating cannot be null' },
          notEmpty: { msg: 'Star rating cannot be empty' },
        },
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Review cannot be null' },
          notEmpty: { msg: 'Review cannot be empty' },
        },
      },
      recommendation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: 'Recommendation cannot be null' },
          notEmpty: { msg: 'Recommendation cannot be empty' },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'review',
      modelName: 'Review',
    }
  );
  return Review;
};

export default reviewModel;

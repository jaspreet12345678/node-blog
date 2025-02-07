import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import Post from './post';
import User from './user';

class Comment extends Model {
  public id!: number;
  public content!: string;
  public postId!: number;
  public userId!: number;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: true,
  }
);

Comment.belongsTo(Post, { foreignKey: 'postId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

export default Comment;

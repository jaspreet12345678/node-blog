import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';
import Tag from './tag';


class Post extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true,
  }
);

Post.belongsTo(User, { foreignKey: 'userId' });
Post.belongsToMany(Tag, { through: 'PostTags', foreignKey: 'postId' });
Tag.belongsToMany(Post, { through: 'PostTags', foreignKey: 'tagId' });

export default Post;

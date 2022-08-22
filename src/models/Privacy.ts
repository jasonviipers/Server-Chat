import { DataTypes, Model, Optional } from 'sequelize';
import database from '../database';

interface PrivacyAttributes {
  id: number;
  body: string;
}

type PrivacyCreationAttributes = Optional<PrivacyAttributes, 'id'>;

export default class Privacy extends Model<PrivacyAttributes, PrivacyCreationAttributes> implements PrivacyAttributes {
  public id!: number;
  body!: string;
}

Privacy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'Privacy',
  },
);
(async () => await database.sync())()
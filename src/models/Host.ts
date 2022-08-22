import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import database from '../database';
import Hash from '../services/Hash';

interface HostAttributes {
  id: number;
  name: string;
  username: string;
  accessToken: string;
  password: string;
  lastMeetingAt: Date;
}

type HostCreationAttributes = Optional<HostAttributes, 'id' | 'accessToken' | 'lastMeetingAt'>;

export default class Host extends Model<HostAttributes, HostCreationAttributes> implements HostAttributes {
  public id!: number;
  public name!: string;
  public username!: string;
  public accessToken!: string;
  public password!: string;
  public lastMeetingAt!: Date;
}

Host.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accessToken: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      unique: true,
      set(accessToken: string) {
        this.setDataValue('accessToken', new Hash(accessToken).hash());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password: string) {
        this.setDataValue('password', new Hash(password).hash());
      },
    },
    lastMeetingAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: database,
    modelName: 'Host',
  },
);
(async () => await database.sync())()
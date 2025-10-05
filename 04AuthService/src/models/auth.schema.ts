import { sequelize } from '@authservices/database';
import { IAuthDocument } from '@pandit-abhishek1/sharedservices';
import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';

interface AuthModelIntanceMethods extends Model{
  prototype: {
    comparePassword:(password: string, hashedPassword: string)=> Promise<boolean>;
    hashPassword:(password: string)=> Promise<string>;
  }
}


type AuthUserCreationAttributes = Optional<IAuthDocument, 'id' | 'createdAt' | 'passwordResetToken' | 'passwordResetExpires'>;


const AuthModel: ModelDefined<IAuthDocument, AuthUserCreationAttributes> & AuthModelIntanceMethods = sequelize.define(
  'auths',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    profilePicture: {
    type: DataTypes.STRING,
    allowNull: false
  },
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    browserName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Unknown'
  },
  deviceType: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'Unknown'
},
  otp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  otpExpiration: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date()
  },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['username']
      },
      {
        unique: true,
        fields: ['email']
      },
      {
      unique: true,
      fields: ['emailVerificationToken']
    }
    ]
  }
) as ModelDefined<IAuthDocument, AuthUserCreationAttributes> & AuthModelIntanceMethods;
AuthModel.addHook('beforeCreate', async(auth)=>{
  const hasshedPassword : string = await bcrypt.hash(auth.dataValues.password as string, 10);
  auth.dataValues.password = hasshedPassword;
});

AuthModel.prototype.comparePassword = async function(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
AuthModel.prototype.hashPassword = async function (password: string): Promise<string>{
  return await bcrypt.hash(password, 10);
}

// force: true always deletes the table when there is a server restart
AuthModel.sync({alter: true});
export { AuthModel };

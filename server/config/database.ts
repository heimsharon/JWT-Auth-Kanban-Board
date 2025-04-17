import { Sequelize } from 'sequelize';

let sequelize;

if (process.env.DB_URL) {

  sequelize = new Sequelize (process.env.DB_URL);
} else {

  sequelize = new Sequelize(
    process.env.DB_NAME || 'default_db_name',
    process.env.DB_USER || 'default_user',
    process.env.DB_PW || 'default_password',
    {
      host: 'localhost',
      dialect: 'postgres',
    },
  );
}

export default sequelize;

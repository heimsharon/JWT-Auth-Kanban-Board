import { Sequelize } from 'sequelize';

let sequelize: Sequelize;

if (process.env.DB_URL) {
  // Use the database URL from the environment variable in production
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging: false, // Disable logging in production
  });
} else {
  // Use local database configuration in development
  sequelize = new Sequelize(
    process.env.DB_NAME || 'kanban_board',
    process.env.DB_USER || 'postgres',
    process.env.DB_PW || 'password',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: console.log, // Enable logging in development
    }
  );
}

export default sequelize;
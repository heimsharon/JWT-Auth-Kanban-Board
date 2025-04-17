import { Sequelize } from 'sequelize';


let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
  // Use Render's DATABASE_URL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Required for Render's managed databases
      },
    },
  });
} else {
  // Fallback for local development
  sequelize = new Sequelize(
    process.env.DB_NAME || 'default_db_name',
    process.env.DB_USER || 'default_user',
    process.env.DB_PW || 'default_password',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
    },
  );
}

export default sequelize;

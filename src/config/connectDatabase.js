import { Sequelize } from "sequelize";


//Passing parameters separately (other dialects)
const sequelize = new Sequelize('auth', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    raw: true,
    raw: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export const loggerConnectionStatus = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
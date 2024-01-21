import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();// Load environment variables from .env file 

class ConfigService {

    constructor(private env: { [k: string]: string | undefined }) { }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.getValue('POSTGRES_HOST') || 'localhost', //"db"
            port: parseInt(this.getValue('POSTGRES_PORT'), 10) || 5432, //5432
            username: this.getValue('POSTGRES_USER'), //'postgres'
            password: this.getValue('POSTGRES_PASSWORD'), //'pass12345'
            database: this.getValue('POSTGRES_DATABASE'), //'postgres'
            autoLoadEntities: true,
            ssl: this.isProduction(),
            synchronize: !this.isProduction(),
        };
    }

}

const configService = new ConfigService(process.env)
    .ensureValues([
        'POSTGRES_HOST',
        'POSTGRES_PORT',
        'POSTGRES_USER',
        'POSTGRES_PASSWORD',
        'POSTGRES_DATABASE'
    ]);

export { configService };
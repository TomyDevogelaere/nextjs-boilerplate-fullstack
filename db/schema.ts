import { int, mysqlTable, varchar, timestamp, boolean } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
    // Gebruik int() met primaryKey en autoincrement voor MariaDB compatibiliteit
    id: int('id').primaryKey().autoincrement(),

    name: varchar('name', { length: 191 }),
    email: varchar('email', { length: 191 }).notNull().unique(),

    // Verhoog de lengte voor gehashte wachtwoorden (minstens 60-100)
    password: varchar('password', { length: 191 }).notNull(),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),

    twoFactorSecret: varchar("2fa_secret", { length: 191 }),
    twoFactorActivated: boolean("2fa_activated").default(false),
});
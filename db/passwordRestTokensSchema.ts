import { int, mysqlTable, varchar, timestamp, boolean } from 'drizzle-orm/mysql-core';
import {users} from "@/db/schema";

export const passwordResteTokens = mysqlTable('password_reset_tokens', {
    // Gebruik int() met primaryKey en autoincrement voor MariaDB compatibiliteit
    id: int('id').primaryKey().autoincrement(),
    Userid: int('user_id').references(() => users.id, {
       onDelete: 'cascade',
    }),
    token: varchar("token", { length: 191 }),
    tokenExpiry: timestamp('token_expiry'),
});
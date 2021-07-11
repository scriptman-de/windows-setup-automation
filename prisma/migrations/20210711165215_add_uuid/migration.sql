-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Computer" (
    "name" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serial" TEXT,
    "uuid" TEXT,
    "model" TEXT,
    "manufacturer" TEXT,
    "mac" TEXT,
    "comment" TEXT
);
INSERT INTO "new_Computer" ("name", "id", "serial", "model", "manufacturer", "mac", "comment") SELECT "name", "id", "serial", "model", "manufacturer", "mac", "comment" FROM "Computer";
DROP TABLE "Computer";
ALTER TABLE "new_Computer" RENAME TO "Computer";
CREATE UNIQUE INDEX "Computer.name_unique" ON "Computer"("name");
CREATE UNIQUE INDEX "Computer.serial_unique" ON "Computer"("serial");
CREATE UNIQUE INDEX "Computer.uuid_unique" ON "Computer"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

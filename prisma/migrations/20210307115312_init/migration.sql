-- CreateTable
CREATE TABLE "Computer" (
    "name" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serial" TEXT NOT NULL,
    "model" TEXT,
    "manufacturer" TEXT,
    "mac" TEXT,
    "comment" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Computer.name_unique" ON "Computer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Computer.serial_unique" ON "Computer"("serial");

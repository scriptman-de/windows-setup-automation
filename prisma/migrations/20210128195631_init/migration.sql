-- CreateTable
CREATE TABLE "Computer" (
    "name" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mac" TEXT NOT NULL,
    "comment" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Computer.name_unique" ON "Computer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Computer.mac_unique" ON "Computer"("mac");

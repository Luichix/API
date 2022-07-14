-- CreateTable
CREATE TABLE "Personal" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "identityCard" TEXT NOT NULL,
    "typeCard" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "workArea" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Hour" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "dayHours" TEXT NOT NULL,
    "personalId" TEXT NOT NULL,

    CONSTRAINT "Hour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personal_uid_key" ON "Personal"("uid");

-- AddForeignKey
ALTER TABLE "Hour" ADD CONSTRAINT "Hour_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

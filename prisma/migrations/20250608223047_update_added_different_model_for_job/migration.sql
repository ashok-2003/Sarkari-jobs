-- CreateTable
CREATE TABLE "JobItem" (
    "id" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "last_date" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultItem" (
    "id" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResultItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionItem" (
    "id" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "last_date" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdmissionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerKeyItem" (
    "id" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnswerKeyItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmitCardItem" (
    "id" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdmitCardItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobItem_href_key" ON "JobItem"("href");

-- CreateIndex
CREATE UNIQUE INDEX "ResultItem_href_key" ON "ResultItem"("href");

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionItem_href_key" ON "AdmissionItem"("href");

-- CreateIndex
CREATE UNIQUE INDEX "AnswerKeyItem_href_key" ON "AnswerKeyItem"("href");

-- CreateIndex
CREATE UNIQUE INDEX "AdmitCardItem_href_key" ON "AdmitCardItem"("href");

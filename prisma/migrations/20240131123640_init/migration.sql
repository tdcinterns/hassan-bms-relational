-- CreateTable
CREATE TABLE "AuthorAuthentication" (
    "_id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "AuthorAuthentication_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Book" (
    "_id" TEXT NOT NULL,
    "GenreID" TEXT NOT NULL,
    "AuthorID" TEXT NOT NULL,
    "Title" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "AuthorContact" (
    "_id" TEXT NOT NULL,
    "AuthorID" TEXT NOT NULL,
    "ContactType" TEXT NOT NULL,
    "PhoneNo" TEXT NOT NULL,
    "Address" TEXT NOT NULL,

    CONSTRAINT "AuthorContact_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "_id" TEXT NOT NULL,
    "GenreName" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "BookStatus" (
    "_id" TEXT NOT NULL,
    "BookID" TEXT NOT NULL,
    "TotalBought" INTEGER NOT NULL,
    "TotalRental" INTEGER NOT NULL,

    CONSTRAINT "BookStatus_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookStatus_BookID_key" ON "BookStatus"("BookID");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_GenreID_fkey" FOREIGN KEY ("GenreID") REFERENCES "Genre"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_AuthorID_fkey" FOREIGN KEY ("AuthorID") REFERENCES "AuthorAuthentication"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorContact" ADD CONSTRAINT "AuthorContact_AuthorID_fkey" FOREIGN KEY ("AuthorID") REFERENCES "AuthorAuthentication"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookStatus" ADD CONSTRAINT "BookStatus_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

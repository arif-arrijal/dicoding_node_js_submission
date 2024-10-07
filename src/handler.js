const {nanoid} = require('nanoid');
const {apiCreated, apiError, apiSuccess, apiNotFound} = require('./util');
const {dataList} = require('./db');

const addData = (request, h) => {
  const {name, year, readPage, pageCount} = request.payload;

  if (!name) {
    return apiError(h, 'Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (+readPage > +pageCount) {
    return apiError(
        h,
        'Gagal menambahkan buku. ' +
        'readPage tidak boleh lebih besar dari pageCount',
    );
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  const data = {
    ...request.payload,
    id,
    name,
    year,
    pageCount,
    readPage,
    finished,
    insertedAt,
    updatedAt: insertedAt,
  };

  dataList.push(data);
  return apiCreated(
      h,
      'Buku berhasil ditambahkan',
      {bookId: dataList[dataList.length - 1].id});
};

const showAll = (request, h) => {
  const {name, reading, finished} = request.query;
  let books = dataList.length ? JSON.parse(JSON.stringify(dataList)) : [];
  if (name) {
    books = books
        .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    books = books.filter((book) => book.reading === (+reading !== 0));
  }

  if (finished !== undefined) {
    books = books.filter((book) => book.finished === (+finished !== 0));
  }

  books = books.map((book) => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };
  });

  return apiSuccess(h, undefined, {books});
};

const findOne = (request, h) => {
  const {id} = request.params;
  const book = dataList.find((book) => book.id === id);

  if (!book) {
    return apiNotFound(h, 'Buku tidak ditemukan');
  }

  return apiSuccess(h, undefined, {book});
};

const deleteById = (request, h) => {
  const {id} = request.params;
  const findIndex = dataList.findIndex((data) => data.id === id);
  if (findIndex < 0) {
    return apiNotFound(h, 'Buku gagal dihapus. Id tidak ditemukan');
  }

  dataList.splice(findIndex, 1);

  return apiSuccess(h, 'Buku berhasil dihapus');
};

const updateById = (request, h) => {
  const {id} = request.params;
  const {name, pageCount, readPage} = request.payload;
  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  if (!name) {
    return apiError(h, 'Gagal memperbarui buku. Mohon isi nama buku');
  }

  if (+readPage > +pageCount) {
    return apiError(
        h,
        'Gagal memperbarui buku. ' +
        'readPage tidak boleh lebih besar dari pageCount');
  }

  const findIndex = dataList.findIndex((data) => data.id === id);
  if (findIndex < 0) {
    return apiNotFound(h, 'Gagal memperbarui buku. Id tidak ditemukan');
  }
  dataList[findIndex] = {
    ...request.payload,
    id,
    name,
    pageCount,
    readPage,
    finished,
    updatedAt,
    insertedAt: dataList[findIndex].insertedAt,
  };

  return apiSuccess(h, 'Buku berhasil diperbarui');
};

module.exports = {
  addData,
  showAll,
  findOne,
  updateById,
  deleteById,
};

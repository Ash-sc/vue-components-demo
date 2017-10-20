/**
 * 过滤笔记
 * @param  {Array} notesList
 * @param  {String} notebookId
 * @return {Array}
 */
export default function noteFilter(notesList, notebookId = '') {
  return notebookId ? notesList.map((item) => {
    return item.notebookId === notebookId
  }) : notesList
}


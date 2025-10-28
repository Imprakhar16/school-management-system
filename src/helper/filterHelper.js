export const convertToIds = (
  search,
  { classes = [], subjects = [], sections = [], teachers = [] }
) => {
  const filters = { ...search };

  if (filters.classId) {
    const matchClass = classes.find((cls) => cls.name === filters.classId);
    if (matchClass) filters.classId = matchClass._id;
    else delete filters.classId;
  }

  if (filters.subjectsId) {
    const matchSubject = subjects.find(
      (sub) => sub.name?.toLowerCase() === filters.subjectsId.toLowerCase()
    );
    if (matchSubject) filters.subjectsId = matchSubject._id;
    else delete filters.subjectsId;
  }

  if (filters.sectionId) {
    const matchSection = sections.find(
      (sec) => sec.name?.toLowerCase() === filters.sectionId.toLowerCase()
    );
    if (matchSection) filters.sectionId = matchSection._id;
    else delete filters.sectionId;
  }

  if (filters.classincharge) {
    const matchIncharge = teachers.find(
      (inc) => `${inc.firstname}`.toLowerCase() === filters.classincharge.toLowerCase()
    );
    if (matchIncharge) filters.classincharge = matchIncharge._id;
    else delete filters.classincharge;
  }

  Object.keys(filters).forEach((key) => {
    if (filters[key] === "") delete filters[key];
  });
  return filters;
};

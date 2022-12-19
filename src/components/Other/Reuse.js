export const truncateString = (str, num) => {
  if (str?.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

export const UpdateDate = (arr) => {
  const orderDateUpdate = arr?.map((el) => {
    const date = new Date(el.createdAt);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const local = navigator.language;

    const formatDate = new Intl.DateTimeFormat(local, options).format(date);
    return { ...el, date: formatDate };
  });
  return orderDateUpdate;
};

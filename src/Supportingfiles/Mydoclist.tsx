import { useFrappeGetDocList } from "frappe-react-sdk";

export const MyDocumentList = (localStorage: any, doctype: any) => {
  const { data, error, isValidating } = useFrappeGetDocList(doctype, {
    fields: ["status", "id"],

    filters: [["id", "=", JSON.parse(localStorage.formdata)["id"]]],

    orderBy: {
      field: "creation",
      order: "desc",
    },
  });

  if (isValidating) {
    return <>Loading</>;
  }
  if (error) {
    return "errors";
  }
  if (data) {
    return data;
  }

  return null;
};

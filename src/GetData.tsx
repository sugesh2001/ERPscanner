import { useFrappeGetDocList } from "frappe-react-sdk";

export function GetData() {
  const { data } = useFrappeGetDocList("Employee", {
    fields: ["first_name", "date_of_birth", "attendance_device_id"],
    filters: [["first_name", "=", "vedha"]],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });
  console.log(data);
  return <div></div>;
}

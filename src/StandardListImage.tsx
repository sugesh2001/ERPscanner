import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useContext } from "react";
import { locateContext } from "./App";
export default function StandardListImage() {
  const {formDataEmployee,setFormDataEmployee}:any = useContext(locateContext)
  const { data }: any = useFrappeGetDocList("Employee", {
    fields: ["imagelist1", "imagelist2", "imagelist3", "imagelist4"],
    filters: [["id", "=", formDataEmployee.id]],
    orderBy: {
      field: "creation",
      order: "desc",
    },
  });
  console.log("lis", data);
  const itemData: any[] = [
    {
      id: 1,
      img: data?.[0].imagelist1 || "",
      title: "Laptop Image 1",
    },
    {
      id: 2,
      img: data?.[0].imagelist2 || "",
      title: "Laptop Image 2",
    },
    {
      id: 3,
      img: data?.[0].imagelist3 || "",
      title: "Laptop Image 3",
    },
    {
      id: 4,
      img: data?.[0].imagelist4 || "",
      title: "Laptop Image 4",
    },
  ];

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
      {itemData.map((item: any) => (
        <ImageListItem className={"imagelist"} key={item.id}>
          <img
            style={{ height: "inherit" }}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
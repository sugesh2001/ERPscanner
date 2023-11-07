import ImageList from "@mui/material/ImageList";
import istItem from "@mui/material/ImageListItem";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useContext } from "react";
import { locateContext } from "./App";
import { useEffect, useState } from "react";
import { ImageListItem } from "@mui/material";
export function StandardListImageExit() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);
  const { formDataEmployee }: any = useContext(locateContext);
  const { data }: any = useFrappeGetDocList("confiscated", {
    fields: ["carry", "imagelist6", "date", "id"],
    filters: [
      ["id", "=", formDataEmployee.id],
      ["date", "=", currentDate],
    ],
    orderBy: {
      field: "creation",
      order: "desc",
    },
  });
  console.log("frmId", formDataEmployee.id);
  const itemData: any = [
    {
      id: 1,
      img: data?.[0].imageSrc,
      title: "Laptop Image",
    },
  ];
  // const itemData: any = data?.[0].imagelist.split(",");s
  console.log("exit", data);
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

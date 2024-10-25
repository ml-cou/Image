import ImageFilter from "@/components/Dashboard/ImageFilter";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:"",
  description: "",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ImageFilter />
      </DefaultLayout>
    </>
  );
}

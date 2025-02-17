import LayoutPage from "../layouts/LayoutPage";
import { GetStaticProps } from "next";
import Bank from "../templates/Bank";

export default function handler() {
  return (
    <LayoutPage pageMeta={{ title: "bank" }}>
      <Bank />
    </LayoutPage>
    );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
}

// import connectMongo from "../functions/connectMongo";
// import { GetServerSideProps } from "next";
// import Table from "../models/Table";
// import TableTotal from "../models/TableTotal";

// export const getServerSideProps: GetServerSideProps = async () => {
//   await connectMongo();

//   // the same as the GET api routes.. but using them i got 500 Server Error when deployed.
//   // didnt have time to figure it out. so same code in two places.

//   let data: TableList = await Table.find();
//   let data2: number = await TableTotal.findOne({
//     _id: "67b233cc84cf8d7f6dbcc49d",
//   });

//   let tables = JSON.parse(JSON.stringify(data));
//   let total = JSON.parse(JSON.stringify(data2));

//   // sort by date (newest first)
//   const table = tables
//     .sort((a, b) => {
//       if (a.date > b.date) return 1;
//       if (a.date < b.date) return -1;
//       return 0;
//     })
//     .reverse();

//   return { props: { table, total : total.value } };
// };

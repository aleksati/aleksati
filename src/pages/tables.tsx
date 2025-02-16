import LayoutPage from "../layouts/LayoutPage";
import Bank from "../templates/Bank";

export default function handler({ table, total }: BankProps) {
  return (
    <LayoutPage pageMeta={{ title: "bank" }}>
      <Bank table={table} total={total} />
    </LayoutPage>
  );
}

import connectMongo from "../functions/connectMongo";
import { GetServerSideProps } from "next";
import { SITE_DOMAIN } from "../config";

export const getServerSideProps: GetServerSideProps = async () => {
  await connectMongo();

  const resTotal = await fetch(`${SITE_DOMAIN}/api/tabletotal`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const resTable = await fetch(`${SITE_DOMAIN}/api/table`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const total: number = await resTotal.json();
  let tableList: TableList = await resTable.json();

  // sort by date (newest first) should be a function now
  const table: TableList = tableList
    .sort((a, b) => {
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
      return 0;
    })

  return { props: { table, total } };
};

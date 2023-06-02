import MyLink from "../components/MyLink";

const Research = ({ data = [], notFound }) => (
  <div className="flex flex-col h-full space-y-4">
    <div className="space-y-1">
      <p className="text-sm">
        Data fetched from{" "}
        <MyLink href="https://app.cristin.no/">Cristin</MyLink>
      </p>
      <hr />
    </div>
    {notFound ? (
      <p>
        <i>Something went wrong while fetching the data...</i>
      </p>
    ) : (
      <div className="flex flex-col space-y-6">
        {data.map((item, idx) => {
          if (idx === 1) return;
          return (
            <div key={idx}>
              {item.authors} ({item.year}). {item.title}. <i>{item.journal}.</i>{" "}
              {item.link ? (
                <MyLink href={item.link}>Avaliable from here</MyLink>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default Research;

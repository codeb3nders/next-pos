export default function Account({ data }: any) {
  return (
    <div>
      {data.map((item: any) => {
        return <div key={item.id}>{item.businessEmail}</div>;
      })}
    </div>
  );
}

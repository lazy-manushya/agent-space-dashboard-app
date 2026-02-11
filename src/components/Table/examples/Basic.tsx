import Table, { Column } from "../index";

type Person = {
  id: number;
  details: {
    name: string;
    age: number;
  };
};

const ITEMS: Person[] = Array.apply(null, Array(100)).map((_, i) => ({
  id: i,
  details: {
    name: `Person ${i + 1}`,
    age: Math.floor(Math.random() * (50 - 20 + 1)) + 20,
  },
}));

const COLUMNS: Column<Person>[] = [
  {
    id: "name",
    accessor: "details.name",
    header: "Name",
    minSize: 200,
    fixed: true,
  },
  {
    id: "id",
    size: 50,
    header: "ID",
    alignment: "center",
  },
  {
    id: "age",
    accessor: "details.age",
    header: "Age",
    alignment: "center",
    cell: ({ cell }) => cell.row.index,
    size: 60,
  },
  //--------------------------------------

  ...Array.apply(null, Array(5)).map(
    (_, i) =>
      ({
        id: `name${i + 1}`,
        accessor: "details.name",
        header: `Column ${i + 1}`,
        cell: ({ cell }) => cell.row.index,
        alignment: "center",
        minSize: 100 * (i + 1),
      } satisfies Column<Person>)
  ),
];

function Basic() {
  return <Table<Person> data={ITEMS} columns={COLUMNS} />;
}

export default Basic;

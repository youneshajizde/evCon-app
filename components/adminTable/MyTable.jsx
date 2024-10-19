import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function MyTable({ data, updateStateInSupabase }) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns(updateStateInSupabase)} data={data} />
    </div>
  );
}

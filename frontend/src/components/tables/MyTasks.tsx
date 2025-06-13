import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

const randomTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage",
    description: "Create wireframes and mockups for the homepage",
    status: "In Progress",
    dueDate: "2025-06-20",
  },
  {
    id: "2",
    title: "Fix login bug",
    description: "Resolve the issue causing login failures on Safari",
    status: "Pending",
    dueDate: "2025-06-15",
  },
  {
    id: "3",
    title: "Update user profile UI",
    description: "Improve the layout and styling of the profile page",
    status: "Completed",
    dueDate: "2025-06-10",
  },
];

export default function MyTasks() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          My Tasks
        </h3>
        <div className="flex items-center gap-3">
          <button className="...">Filter</button>
          <button className="...">See all</button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className=" text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Title
              </TableCell>
              <TableCell isHeader className="text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Description
              </TableCell>
              <TableCell isHeader className="text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Due Date
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {randomTasks.length === 0 ? (
              <TableRow>
                <TableCell className="py-3 text-center text-gray-500" >
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              randomTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="py-3 text-theme-sm text-gray-800 dark:text-white/90">
                    {task.title}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {task.description}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {task.status}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

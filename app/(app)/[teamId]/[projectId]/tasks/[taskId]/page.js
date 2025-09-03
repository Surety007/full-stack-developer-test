export default async function TaskPage ({ params }) {
  const {taskId} = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Task Page</h1>
      <p className="mt-4">Task ID: {taskId}</p>
    </div>
  );
}

export default async function TeamPage({ params }) {
  const {teamId}= await params;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Team Page</h1>
      <p className="mt-4">Team ID: {teamId}</p>
    </div>
  );
}

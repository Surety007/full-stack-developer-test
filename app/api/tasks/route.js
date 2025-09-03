let tasks = []; // in-memory storage for tasks

export async function POST(req) {
  const data = await req.json();
  const newTask = { id: Date.now(), ...data };
  tasks.push(newTask);
  return new Response(JSON.stringify(newTask), { status: 201 });
}

export async function GET() {
  return new Response(JSON.stringify(tasks), { status: 200 });
}

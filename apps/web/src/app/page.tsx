type HealthResponse = {
  status: string;
  service: string;
  version: string;
  timestamp: string;
};

async function getHealth(): Promise<HealthResponse> {
  const response = await fetch('http://localhost:3001/health', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch API health');
  }

  return response.json();
}

export default async function Home() {
  const health = await getHealth();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Open-Source CodeSprint</h1>

        <p className="text-lg">
          API Status: <strong>{health.status}</strong>
        </p>

        <p>{health.service}</p>

        <p>Version: {health.version}</p>
      </div>
    </main>
  );
}
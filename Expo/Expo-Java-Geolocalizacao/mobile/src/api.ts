export type SavedLocation = {
  id: number;
  name: string | null;
  latitude: number;
  longitude: number;
  createdAt: string;
};

// Troque pelo IP LAN do computador onde o Spring Boot está executando.
// IP Wi-Fi deste computador. Celular e computador devem estar na mesma rede.
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

function apiUrl(path: string): string {
  if (!API_BASE_URL) {
    throw new Error('Configure EXPO_PUBLIC_API_BASE_URL no arquivo .env com o IP LAN do computador, por exemplo http://192.168.1.10:8080.');
  }
  return `${API_BASE_URL}${path}`;
}

async function assertOk(response: Response): Promise<void> {
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`API respondeu HTTP ${response.status}: ${details}`);
  }
}

export async function saveLocation(point: {
  name: string;
  latitude: number;
  longitude: number;
}): Promise<SavedLocation> {
  const response = await fetch(apiUrl('/api/locations'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(point),
  });
  await assertOk(response);
  return (await response.json()) as SavedLocation;
}

export async function getLocations(): Promise<SavedLocation[]> {
  const response = await fetch(apiUrl('/api/locations'));
  await assertOk(response);
  return (await response.json()) as SavedLocation[];
}

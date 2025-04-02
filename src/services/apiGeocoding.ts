const GEOLOCATION_API_URL = import.meta.env.VITE_GEOLOCATION_API_URL;

export async function getAddress({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) {
  const res = await fetch(
    `${GEOLOCATION_API_URL}?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

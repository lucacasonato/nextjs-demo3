import { revalidateTag, unstable_cache } from "next/cache";

const getCurrentTime = unstable_cache(async () => {
  return new Date().toISOString();
}, undefined, { tags: ["time"]})

export default async function Page() {
  async function reloadTime() {
    "use server"
    revalidateTag("time")
  }

  const time = await getCurrentTime()
  return (
    <div>
      <p>{time}</p>
      <button onClick={reloadTime}>Reload</button>
    </div>
  );
}

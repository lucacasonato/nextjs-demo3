import { revalidateTag, unstable_cacheTag } from "next/cache";

async function getCurrentTime() {
  "use cache";
  unstable_cacheTag("time");
  return new Date().toISOString();
}

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

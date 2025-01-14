import { revalidateTag, unstable_cacheTag } from "next/cache";

async function getCurrentTime() {
  "use cache";
  console.log("Getting time")
  unstable_cacheTag("time");
  return new Date().toISOString();
}

export default async function Page() {
  async function reloadTime() {
    "use server"
    console.log("Reloading time")
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

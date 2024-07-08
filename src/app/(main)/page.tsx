import { getUserData } from "@/actions/get-user-data";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {

  const userData = await getUserData()

  if (!userData) {
    return redirect("/auth")
  }

  const userWorkspaceId = userData.workspaces?.[0]

  if(!userWorkspaceId) {
    return redirect("/create-workspace")
  }

  if(userWorkspaceId){
    return redirect(`/workspace/${userWorkspaceId}`)
  }

  return (
    <div className="flex h-full w-full justify-center items-center">
      <h1>Home</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  );
}
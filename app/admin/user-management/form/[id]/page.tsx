import { UserForm } from "../user-form"

type EditUserPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params
  
  return <UserForm userId={id} />
}
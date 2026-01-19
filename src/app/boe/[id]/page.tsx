import BoeDetailPage from "@/pages_lib/BoeDetailPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <BoeDetailPage id={id} />;
}

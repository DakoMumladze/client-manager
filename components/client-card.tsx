import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, type ClientStatus } from "@/components/ui/status-badge";

export type Client = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: ClientStatus;
  notes: string | null;
  created_at: string;
};

export function ClientCard({ client }: { client: Client }) {
  return (
    <Link href={`/clients/${client.id}`} className="block">
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{client.name}</CardTitle>
            <StatusBadge status={client.status} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1.5 text-sm text-stone-500">
            {client.email && (
              <p className="flex items-center gap-1.5">
                <Mail className="size-3.5 text-stone-400" />
                {client.email}
              </p>
            )}
            {client.phone && (
              <p className="flex items-center gap-1.5">
                <Phone className="size-3.5 text-stone-400" />
                {client.phone}
              </p>
            )}
            {!client.email && !client.phone && (
              <p className="italic">No contact info</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

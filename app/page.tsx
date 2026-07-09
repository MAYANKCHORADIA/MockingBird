'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [endpoints, setEndpoints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/endpoints')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEndpoints(data.endpoints);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-sm font-medium text-slate-700">Manage your mock API endpoints.</p>
        </div>
        <Link href="/create">
          <Button>Create Endpoint</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Routes</CardTitle>
          <CardDescription>A list of all provisioned endpoints.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-200">
                  <TableHead className="py-3 px-4 font-semibold text-slate-700">Method</TableHead>
                  <TableHead className="py-3 px-4 font-semibold text-slate-700">URL</TableHead>
                  <TableHead className="py-3 px-4 font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="py-3 px-4 font-semibold text-slate-700 text-right">Delay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-slate-500">Loading...</TableCell>
                  </TableRow>
                ) : endpoints.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-slate-500">No endpoints found.</TableCell>
                  </TableRow>
                ) : (
                  endpoints.map((ep) => (
                    <TableRow key={ep.id} className="border-b border-slate-200">
                      <TableCell className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-mono font-semibold uppercase">
                          GET
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-slate-700 bg-slate-100 px-2 py-1 rounded">/api/mock/{ep.id}</span>
                          <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/api/mock/${ep.id}`)}>
                            Copy
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 px-4 font-mono text-sm">
                        {ep.httpStatus}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-right font-mono text-sm">
                        {ep.delayMs}ms
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

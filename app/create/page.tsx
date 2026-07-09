'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function CreateEndpoint() {
  const router = useRouter();
  const [payload, setPayload] = useState('{\n  "status": "success",\n  "message": "Hello from Mockingbird!",\n  "data": {\n    "id": 1,\n    "name": "John Doe"\n  }\n}');
  const [httpStatus, setHttpStatus] = useState("200");
  const [delayMs, setDelayMs] = useState("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Validate JSON on the client side first
    let parsedPayload;
    try {
      parsedPayload = JSON.parse(payload);
    } catch (err) {
      setError('Invalid JSON format. Please verify your brackets, quotes, and commas.');
      setLoading(false);
      return;
    }

    try {
      // 2. Fire the POST request to our creation backend route
      const res = await fetch('/api/endpoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: parsedPayload,
          httpStatus: Number(httpStatus),
          delayMs: Number(delayMs),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Redirect to dashboard on success
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to connect to the server.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Endpoint</h1>
        <p className="text-sm font-medium text-slate-700">Configure your mock response.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Endpoint Configuration</CardTitle>
          <CardDescription>We'll generate a unique, live URL you can instantly use.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700">Response JSON Body</label>
              <Textarea 
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                rows={10}
                className="font-mono text-sm bg-slate-50 border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">HTTP Status Code</label>
                <Select value={httpStatus} onValueChange={(val) => setHttpStatus(val || "200")}>
                  <SelectTrigger className="bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="200">200 - OK</SelectItem>
                    <SelectItem value="201">201 - Created</SelectItem>
                    <SelectItem value="400">400 - Bad Request</SelectItem>
                    <SelectItem value="401">401 - Unauthorized</SelectItem>
                    <SelectItem value="403">403 - Forbidden</SelectItem>
                    <SelectItem value="404">404 - Not Found</SelectItem>
                    <SelectItem value="500">500 - Internal Server Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Artificial Latency (ms)</label>
                <Input
                  type="number"
                  min={0}
                  max={10000}
                  value={delayMs}
                  onChange={(e) => setDelayMs(e.target.value)}
                  className="bg-slate-50 border-slate-200"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating Endpoint...' : 'Generate Live Mock URL'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
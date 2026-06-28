import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Badge } from '@/Components/ui/badge';
import { Switch } from '@/Components/ui/switch';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { IconPlus } from '@tabler/icons-react';
import type { Category, Department, Priority } from '@/types/cims';

const PRIORITY_COLORS = [
    { value: 'destructive', label: 'Critical (Red)' },
    { value: 'warning', label: 'High (Orange)' },
    { value: 'default', label: 'Medium (Blue)' },
    { value: 'secondary', label: 'Low (Gray)' },
];

export default function Index({
    categories: initialCategories,
    priorities: initialPriorities,
    departments,
}: {
    categories: Category[];
    priorities: Priority[];
    departments: Department[];
}) {
    const [categories, setCategories] = useState(initialCategories);
    const [priorities, setPriorities] = useState(initialPriorities);

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [priorityOpen, setPriorityOpen] = useState(false);

    const [categoryForm, setCategoryForm] = useState({ name: '', department: '', active: true });
    const [priorityForm, setPriorityForm] = useState({ name: '', slaHours: '72', color: 'default' });

    const [categoryError, setCategoryError] = useState('');
    const [priorityError, setPriorityError] = useState('');

    function handleAddCategory() {
        if (!categoryForm.name.trim()) {
            setCategoryError('Category name is required.');
            return;
        }
        if (!categoryForm.department) {
            setCategoryError('Please select a department.');
            return;
        }

        const nextId = Math.max(0, ...categories.map((c) => c.id)) + 1;
        setCategories([
            ...categories,
            {
                id: nextId,
                name: categoryForm.name.trim(),
                department: categoryForm.department,
                incidentCount: 0,
                active: categoryForm.active,
            },
        ]);
        setCategoryForm({ name: '', department: '', active: true });
        setCategoryError('');
        setCategoryOpen(false);
    }

    function handleAddPriority() {
        if (!priorityForm.name.trim()) {
            setPriorityError('Priority name is required.');
            return;
        }
        const sla = parseInt(priorityForm.slaHours, 10);
        if (isNaN(sla) || sla <= 0) {
            setPriorityError('SLA hours must be a positive number.');
            return;
        }

        const nextId = Math.max(0, ...priorities.map((p) => p.id)) + 1;
        setPriorities([
            ...priorities,
            {
                id: nextId,
                name: priorityForm.name.trim(),
                slaHours: sla,
                color: priorityForm.color,
                incidentCount: 0,
            },
        ]);
        setPriorityForm({ name: '', slaHours: '72', color: 'default' });
        setPriorityError('');
        setPriorityOpen(false);
    }

    function toggleCategoryActive(id: number, active: boolean) {
        setCategories(categories.map((c) => (c.id === id ? { ...c, active } : c)));
    }

    return (
        <AdminLayout>
            <Head title="Categories & Priorities" />
            <PageHeader title="Categories & Priorities" description="Configure incident classification and SLA tiers." />

            <Tabs defaultValue="categories" className="mt-6">
                <TabsList>
                    <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
                    <TabsTrigger value="priorities">Priorities ({priorities.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="categories">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between gap-4">
                            <CardTitle>Incident Categories</CardTitle>
                            <Dialog open={categoryOpen} onOpenChange={setCategoryOpen}>
                                <DialogTrigger asChild>
                                    <Button size="sm">
                                        <IconPlus className="size-4" />
                                        Add Category
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add Category</DialogTitle>
                                        <DialogDescription>
                                            Create a new incident category and assign it to a department.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="cat-name">Category Name</Label>
                                            <Input
                                                id="cat-name"
                                                placeholder="e.g. Traffic Signals"
                                                value={categoryForm.name}
                                                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Department</Label>
                                            <Select
                                                value={categoryForm.department}
                                                onValueChange={(v) => setCategoryForm({ ...categoryForm, department: v })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {departments.map((d) => (
                                                        <SelectItem key={d.id} value={d.name}>
                                                            {d.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg border border-border p-3">
                                            <div>
                                                <Label htmlFor="cat-active">Active</Label>
                                                <p className="text-xs text-muted-foreground">Available for new reports</p>
                                            </div>
                                            <Switch
                                                id="cat-active"
                                                checked={categoryForm.active}
                                                onCheckedChange={(active) => setCategoryForm({ ...categoryForm, active })}
                                            />
                                        </div>
                                        {categoryError && (
                                            <p className="text-sm text-destructive">{categoryError}</p>
                                        )}
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setCategoryOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleAddCategory}>Add Category</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent className="overflow-x-auto p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Incidents</TableHead>
                                        <TableHead>Active</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map((c) => (
                                        <TableRow key={c.id}>
                                            <TableCell className="font-medium">{c.name}</TableCell>
                                            <TableCell>{c.department}</TableCell>
                                            <TableCell>{c.incidentCount}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={c.active}
                                                    onCheckedChange={(active) => toggleCategoryActive(c.id, active)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="priorities">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between gap-4">
                            <CardTitle>Priority Levels</CardTitle>
                            <Dialog open={priorityOpen} onOpenChange={setPriorityOpen}>
                                <DialogTrigger asChild>
                                    <Button size="sm">
                                        <IconPlus className="size-4" />
                                        Add Priority
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add Priority Level</DialogTitle>
                                        <DialogDescription>
                                            Define a new SLA tier for incident response times.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="pri-name">Priority Name</Label>
                                            <Input
                                                id="pri-name"
                                                placeholder="e.g. Urgent"
                                                value={priorityForm.name}
                                                onChange={(e) => setPriorityForm({ ...priorityForm, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="pri-sla">SLA (hours)</Label>
                                            <Input
                                                id="pri-sla"
                                                type="number"
                                                min={1}
                                                placeholder="72"
                                                value={priorityForm.slaHours}
                                                onChange={(e) => setPriorityForm({ ...priorityForm, slaHours: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Display Color</Label>
                                            <Select
                                                value={priorityForm.color}
                                                onValueChange={(v) => setPriorityForm({ ...priorityForm, color: v })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {PRIORITY_COLORS.map((c) => (
                                                        <SelectItem key={c.value} value={c.value}>
                                                            {c.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {priorityError && (
                                            <p className="text-sm text-destructive">{priorityError}</p>
                                        )}
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setPriorityOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleAddPriority}>Add Priority</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent className="overflow-x-auto p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>SLA (hours)</TableHead>
                                        <TableHead>Incidents</TableHead>
                                        <TableHead>Level</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {priorities.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell className="font-medium">{p.name}</TableCell>
                                            <TableCell>{p.slaHours}h</TableCell>
                                            <TableCell>{p.incidentCount}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{p.name}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\DepartmentResource;
use App\Http\Resources\IncidentResource;
use App\Models\Department;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Department::class);

        $organizationId = auth()->user()->organization->id;

        $departments = Department::with('head')->withStats()->where('organization_id', $organizationId)->get();

        return Inertia::render('Admin/Departments/Index', [
            'departments' => DepartmentResource::collection($departments),
        ]);
    }

    public function show(int $id): Response
    {
        $department = Department::with(['head', 'incidents'])->withStats()->find($id);

        $this->authorize('view', $department);
        
        return Inertia::render('Admin/Departments/Show', [
            'departmentData' => new DepartmentResource($department),
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Departments/Index', [
            'departments' => MockData::departments(),
        ]);
    }

    public function show(int $id): Response
    {
        $department = collect(MockData::departments())->firstWhere('id', $id)
            ?? MockData::departments()[0];

        return Inertia::render('Admin/Departments/Show', [
            'department' => $department,
            'incidents' => MockData::incidentsForDepartment($department['name']),
        ]);
    }
}

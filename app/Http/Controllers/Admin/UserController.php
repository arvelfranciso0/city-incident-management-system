<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => MockData::users(),
        ]);
    }

    public function show(int $id): Response
    {
        $user = collect(MockData::users())->firstWhere('id', $id)
            ?? MockData::users()[0];

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create', [
            'departments' => MockData::departments(),
            'creatableRoles' => MockData::creatableRolesFor('admin'),
            'actorRole' => 'admin',
        ]);
    }

    public function edit(int $id): Response
    {
        $user = collect(MockData::users())->firstWhere('id', $id)
            ?? MockData::users()[0];

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'departments' => MockData::departments(),
        ]);
    }
}

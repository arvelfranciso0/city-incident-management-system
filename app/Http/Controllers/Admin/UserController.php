<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateUser;
use App\Http\Resources\Admin\UserResource;
use App\Models\Staff;
use App\Models\User;
use App\Support\MockData;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $organization = auth()->user()->organization;
        
        $users = User::forOrganization($organization)
            ->with(['department', 'staff.departments'])
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role->value,
                'status' => $user->status->value,
                'department' => $user->role === UserRole::Staff
                    ? ($user->staff->flatMap->departments->pluck('name')->unique()->join(', ') ?: null)
                    : $user->department?->name,
                'lastLogin' => $user->last_login_at?->toIso8601String() ?? '',
            ]);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function show(int $id): Response
    {
        $organization = auth()->user()->organization;

        $user = User::forOrganization($organization)
            ->with(['department', 'staff.departments'])
            ->withCount([
                'reportedIncidents as incidentsReported',
                'assignedIncidents as incidentsHandled',
            ])
            ->findOrFail($id);

        return Inertia::render('Admin/Users/Show', [
            'user' => UserResource::make($user)->resolve(),
        ]);
    }

    public function create(): Response
    {
        $organization = auth()->user()->organization;

        return Inertia::render('Admin/Users/Create', [
            'departments' => $organization->departments()->orderBy('name')->get(['id', 'name']),
            'creatableRoles' => MockData::creatableRolesFor('admin'),
            'actorRole' => auth()->user()->role?->value ?? UserRole::Admin->value,
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

    public function store(CreateUser $request): RedirectResponse
    {
        $organization = auth()->user()->organization;
        $validated = $request->validated();

        $count = DB::transaction(function () use ($organization, $validated) {
            $created = 0;

            foreach ($validated['users'] as $userData) {
                $user = User::create([
                    'organization_id' => $organization->id,
                    'department_id' => $userData['role'] === UserRole::Staff->value ? $userData['department_id'] : null,
                    'name' => $userData['name'],
                    'email' => $userData['email'],
                    'username' => $userData['username'],
                    'password' => $userData['password'],
                    'role' => $userData['role'],
                    'status' => UserStatus::Active,
                    'joined_at' => now(),
                ]);

                if ($userData['role'] === UserRole::Staff->value) {
                    $staff = Staff::create([
                        'organization_id' => $organization->id,
                        'user_id' => $user->id,
                    ]);

                    $staff->departments()->attach($userData['department_id']);
                }

                $created++;
            }

            return $created;
        });

        $label = $count === 1 ? 'user' : 'users';

        return redirect()
            ->route('admin.users.create')
            ->with('success', "Successfully created {$count} {$label}.");
    }

    public function deactivate(User $user)
    {
        $user->update(['status' => UserStatus::Inactive]);

        return back()->with('success', 'User deactivated.');
    }
}

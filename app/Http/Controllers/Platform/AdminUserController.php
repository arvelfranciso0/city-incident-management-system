<?php

namespace App\Http\Controllers\Platform;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\Platform\OrganizationPresenter;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        $admins = User::query()
            ->where('role', UserRole::Admin)
            ->with('organization')
            ->latest('joined_at')
            ->get()
            ->map(fn (User $user) => [
                ...OrganizationPresenter::adminUser($user),
                'organization' => $user->organization ? [
                    'id' => $user->organization->id,
                    'name' => $user->organization->name,
                    'slug' => $user->organization->slug,
                ] : null,
            ]);

        return Inertia::render('Platform/Admins/Index', [
            'admins' => $admins,
        ]);
    }
}

<?php

namespace App\Policies;

use App\Models\User;

abstract class BasePolicy
{
    public function before(User $user, string $ability): ?bool
    {
        return $user->isSuperAdmin() ? true :null;
    }
}

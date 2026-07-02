<?php

namespace App\Policies;

use App\Enums\Permission;
use App\Models\Incident;
use App\Models\User;

class IncidentPolicy extends BasePolicy
{ 
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission(Permission::IncidentsManage);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Incident $incident): bool
    {   
        if($incident->is_guest_report){
            return true;
        }

        return $user->organization_id === $incident->organization_id && $user->hasPermission(Permission::IncidentsManage);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission(Permission::IncidentsReport);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Incident $incident): bool
    {
        return $user->hasPermission(Permission::IncidentUpdate, Permission::IncidentsManage);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Incident $incident): bool
    {
        return $user->hasPermission(Permission::IncidentsManage);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Incident $incident): bool
    {
        return $user->hasPermission(Permission::IncidentsManage);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Incident $incident): bool
    {
        return $user->hasPermission(Permission::IncidentsManage);
    }
}

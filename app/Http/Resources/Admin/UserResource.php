<?php

namespace App\Http\Resources\Admin;

use App\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role->value,
            'department' => $this->role === UserRole::Staff
                ? ($this->staff->flatMap->departments->pluck('name')->unique()->join(', ') ?: null)
                : $this->department?->name,
            'status' => $this->status->value,
            'lastLogin' => $this->last_login_at?->toIso8601String() ?? '',
            'phone' => $this->phone,
            'jobTitle' => $this->job_title,
            'joinedAt' => $this->created_at?->toIso8601String(),
            'address' => $this->address,
            'bio' => $this->bio,
            'incidentsHandled' => $this->incidentsHandled ?? $this->assignedIncidents ?? 0,
            'incidentsReported' => $this->incidentsReported ?? $this->reported_incidents_count ?? 0,
            'permissions' => $this->role?->grantedPermissions() ?? [],
            'department_id' => $this->department_id
        ];
    }
}

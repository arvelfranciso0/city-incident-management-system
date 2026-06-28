<?php

namespace App\Models;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\Concerns\BelongsToOrganization;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use BelongsToOrganization, HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'organization_id',
        'department_id',
        'name',
        'email',
        'username',
        'password',
        'role',
        'status',
        'phone',
        'job_title',
        'address',
        'bio',
        'avatar_path',
        'last_login_at',
        'joined_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
        'joined_at' => 'datetime',
        'password' => 'hashed',
        'role' => UserRole::class,
        'status' => UserStatus::class,
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function headedDepartment(): HasMany
    {
        return $this->hasMany(Department::class, 'head_user_id');
    }

    public function reportedIncidents(): HasMany
    {
        return $this->hasMany(Incident::class, 'reporter_user_id');
    }

    public function assignedIncidents(): HasMany
    {
        return $this->hasMany(Incident::class, 'assigned_to_user_id');
    }

    public function timelineEvents(): HasMany
    {
        return $this->hasMany(IncidentTimelineEvent::class);
    }

    public function uploadedAttachments(): HasMany
    {
        return $this->hasMany(IncidentAttachment::class, 'uploaded_by_user_id');
    }

    public function incidentFeedback(): HasMany
    {
        return $this->hasMany(IncidentFeedback::class);
    }

    public function cimsNotifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class);
    }

    public function activityLogs(): HasMany
    {
        return $this->hasMany(ActivityLog::class);
    }
}

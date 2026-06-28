<?php

namespace App\Models;

use App\Enums\IncidentStatus;
use App\Models\Concerns\BelongsToOrganization;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Incident extends Model
{
    use BelongsToOrganization, HasFactory;

    protected $fillable = [
        'organization_id',
        'reference',
        'tracking_number',
        'title',
        'description',
        'status',
        'location',
        'address_line',
        'city',
        'postal_code',
        'lat',
        'lng',
        'department_id',
        'category_id',
        'priority_id',
        'reporter_user_id',
        'assigned_to_user_id',
        'reporter_name',
        'reporter_email',
        'reporter_phone',
        'is_guest_report',
        'resolution_note',
        'resolved_at',
        'closed_at',
        'sla_due_at',
        'sla_breached_at',
        'reported_at',
    ];

    protected $casts = [
        'status' => IncidentStatus::class,
        'lat' => 'decimal:7',
        'lng' => 'decimal:7',
        'is_guest_report' => 'boolean',
        'resolved_at' => 'datetime',
        'closed_at' => 'datetime',
        'sla_due_at' => 'datetime',
        'sla_breached_at' => 'datetime',
        'reported_at' => 'datetime',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function priority(): BelongsTo
    {
        return $this->belongsTo(Priority::class);
    }

    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reporter_user_id');
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to_user_id');
    }

    public function timelineEvents(): HasMany
    {
        return $this->hasMany(IncidentTimelineEvent::class);
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(IncidentAttachment::class);
    }

    public function feedback(): HasOne
    {
        return $this->hasOne(IncidentFeedback::class);
    }

    public function activityLogs(): HasMany
    {
        return $this->hasMany(ActivityLog::class);
    }
}

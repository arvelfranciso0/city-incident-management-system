<?php

namespace App\Models;

use App\Enums\IncidentStatus;
use App\Models\Concerns\BelongsToOrganization;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use BelongsToOrganization, HasFactory, SoftDeletes;

    protected $fillable = [
        'organization_id',
        'head_user_id',
        'name',
        'slug',
        'description',
        'email',
        'phone',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'staffCount' => 'integer',
        'openIncidents' => 'integer',
        'avgResolutionDays' => 'float',
    ];

    public function head(): BelongsTo
    {
        return $this->belongsTo(User::class, 'head_user_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function incidents(): HasMany
    {
        return $this->hasMany(Incident::class);
    }

    public function activityLogs(): HasMany
    {
        return $this->hasMany(ActivityLog::class);
    }

    public function staff(): BelongsToMany
    {
        return $this->belongsToMany(Staff::class)->withTimestamps();
    }

    /**
     * Subquery: average days from reported_at to resolved_at for this department.
     */
    public static function avgResolutionDaysSubquery()
    {
        return Incident::query()
            ->selectRaw('COALESCE(ROUND(AVG(TIMESTAMPDIFF(SECOND, reported_at, resolved_at)) / 86400, 1), 0)')
            ->whereColumn('incidents.department_id', 'departments.id')
            ->whereNotNull('resolved_at');
    }

    /**
     * Eager-loadable stats used on dashboards and department lists.
     */
    public function scopeWithStats(Builder $query): Builder
    {
        return $query
            ->select('departments.*')
            ->withCount([
                'staff as staffCount',
                'incidents as openIncidents' => fn ($q) => $q->where('status', IncidentStatus::Open->value),
            ])
            ->addSelect([
                'avgResolutionDays' => static::avgResolutionDaysSubquery(),
            ]);
    }
    public function scopeWithStaffCount(Builder $query): Builder
    {
        return $query->withCount(['staff as staffCount']);
    }
}

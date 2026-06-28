<?php

namespace App\Models;

use App\Enums\TimelineEventType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IncidentTimelineEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'incident_id',
        'user_id',
        'type',
        'title',
        'description',
        'metadata',
    ];

    protected $casts = [
        'type' => TimelineEventType::class,
        'metadata' => 'array',
    ];

    public function incident(): BelongsTo
    {
        return $this->belongsTo(Incident::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

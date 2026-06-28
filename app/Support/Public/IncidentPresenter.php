<?php

namespace App\Support\Public;

use App\Models\Incident;
use App\Models\IncidentTimelineEvent;
use Illuminate\Support\Collection;

class IncidentPresenter
{
    public static function forTrack(Incident $incident): array
    {
        $incident->loadMissing(['category', 'priority', 'department', 'assignee']);

        return [
            'id' => $incident->reference,
            'title' => $incident->title,
            'description' => $incident->description,
            'category' => $incident->category?->name ?? 'Uncategorized',
            'priority' => $incident->priority?->slug ?? $incident->priority?->name ?? 'medium',
            'status' => $incident->status?->value ?? $incident->status,
            'location' => $incident->location,
            'lat' => $incident->lat ? (float) $incident->lat : null,
            'lng' => $incident->lng ? (float) $incident->lng : null,
            'reportedAt' => $incident->reported_at?->toIso8601String() ?? $incident->created_at?->toIso8601String(),
            'updatedAt' => $incident->updated_at?->toIso8601String(),
            'assignedTo' => $incident->assignee?->name,
            'department' => $incident->department?->name ?? 'Unassigned',
            'reporter' => $incident->reporter_name ?? $incident->reporter?->name ?? 'Guest',
            'trackingNumber' => $incident->tracking_number,
        ];
    }

    /**
     * @param  Collection<int, IncidentTimelineEvent>  $events
     */
    public static function timeline(Collection $events): array
    {
        return $events
            ->sortBy('created_at')
            ->values()
            ->map(fn (IncidentTimelineEvent $event) => [
                'id' => $event->id,
                'type' => $event->type?->value ?? $event->type,
                'title' => $event->title,
                'description' => $event->description ?? '',
                'timestamp' => $event->created_at?->toIso8601String() ?? '',
                'user' => $event->user?->name ?? 'System',
            ])
            ->all();
    }
}
